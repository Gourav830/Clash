import { Router, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validations/authValidations.js";
import { ZodError } from "zod";
import { formatEror, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import {v4 as uuid4} from "uuid";
import { emailQueue, emailQueueName } from "../jobs/emailJobs.js";
const router = Router();
import jwt  from "jsonwebtoken";
import authMiddleware from "../middleware/AuthMiddleWare.js";
//REgister Route

router.post("/register", async (req: Request, res: Response) => {
  
  try {
    const body = req.body
    const payload = registerSchema.parse(body)
    let user = await prisma.user.findUnique(({where:{email:payload.email}}))
    if(user){
      return res.status(422).json({
        errors:{
          email:"Email already exists"
        }
      })
    }

    //Encryption
    

    const salt = await bcrypt.genSalt(12);
      payload.password = await bcrypt.hash(payload.password,salt);
    
      //Token
      const token = await bcrypt.hash(uuid4(),salt)
      // await prisma.user.update({where:{email:payload.email},data:{email_verified_token:token}})
      const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`
      const emailBody = await renderEmailEjs("verify-email",{name:payload.name,url:url})
    // Send Email
    await emailQueue.add(emailQueueName, {
      to: payload.email,
      subject: "Clash Verify Email",
      body: emailBody
    });

      //database
      await prisma.user.create({
        data:{
          name:payload.name,
          email:payload.email,
          password:payload.password,
          email_verified_token:token
        }
      })
      return res.json({message:"Check your email to verify your account"})



  } 
  catch (error) {
    if(error instanceof ZodError){
      const errors = formatEror(error);
      return res.status(422).json({message:"Invalid data",errors});
    
    }
    console.log(error);
   return res.status(500).json({message:"Something went wrong . Please try again later",error});
  }
});
//login Route 

router.post("/login", async (req: Request, res: Response) => {
  try {
    const body = req.body
    const payload = loginSchema.parse(body)
    console.log(payload);
    const user = await prisma.user.findUnique({where:{email:payload.email}})
    if( user===null || !user){
      return res.status(422).json({errors :{email:"Invalid  credentials"}})
    }
    const isMatch = await bcrypt.compare(payload.password,user.password)
    if(!isMatch){
      return res.status(422).json({errors :{email:"Invalid  credentials"}})
    }

      let JWT_payload = {
        id:user.id,
        name:user.name,
        email:user.email
      }

      const token = jwt.sign(JWT_payload,process.env.JWT_SECRET_KEY!,{expiresIn:"365d"})
      
      return res.json({
        message:"Login Success",
        data:{
          ...JWT_payload,
          token:`bearer ${token}`
        }
      })





  } catch (error) {
    console.log(error);
    return res.status(500).json({errors:"Something went wrong . Please try again later",error});
  }
});


router.get("/user",authMiddleware,async (req: Request, res: Response) => {
  const user = req.user
  return res.json({data:user})

} ) 
export default router;

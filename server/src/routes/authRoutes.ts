import { Router, Request, Response } from "express";
import { registerSchema } from "../validations/authValidations.js";
import { ZodError } from "zod";
import { formatEror } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
const router = Router();
//REgister Route

router.post("/register", async (req: Request, res: Response) => {
  
  try {
    const body = req.body
    const payload = registerSchema.parse(body)
    let user = await prisma.user.findUnique(({where:{email:payload.email}}))
    if(user){
       res.status(422).json({
        errors:{
          email:"Email already exists"
        }
      })
    }

    //Encryption

    const salt = await bcrypt.genSalt(13);
      payload.password = await bcrypt.hashSync(payload.password,salt);
    
      //database
      await prisma.user.create({
        data:{
          name:payload.name,
          email:payload.email,
          password:payload.password
        }
      })
      res.json({message:"User registered successfully"})



  } 
  catch (error) {
    if(error instanceof ZodError){
      const errors = formatEror(error);
       res.status(422).json({message:"Invalid data",errors});
    
    }
    console.log(error);
    res.status(500).json({message:"Something went wrong . Please try again later"});
  }
});

export default router;

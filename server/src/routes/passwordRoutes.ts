import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { checkDateHourDifference, formatEror, renderEmailEjs } from "../helper.js";
import { ForgertPasswordSchema, passwordResetSchema } from "../validations/passwordvalidation.js";
import bcrypt from 'bcrypt';
import {v4 as uuid4} from 'uuid';
import prisma from "../config/database.js";
import { emailQueue, emailQueueName } from "../jobs/emailJobs.js";
import { authLimiter } from "../config/rateLinit.js";

const router = Router();

router.post("/forgot-password", authLimiter,async (req: Request, res: Response) :Promise<void>=> {
    try {
        // Send email to user with the link to reset password
        const body = req.body;

        
         const payload = ForgertPasswordSchema.parse(body)

                let user = await prisma.user.findUnique({where:{email:payload.email}})
            if(!user || user==null)  {
                 res.status(422).json({message:"Email not found",errors:{
                    email:"Email not found"
                }
         
            })
            return;
            } 
            const salt = await bcrypt.genSalt(10);
           const token = await bcrypt.hash(uuid4(), salt); 
            await prisma.user.update({
                data:{
                    passwordResetToken:token,
                token_send_at:  new Date().toISOString()
                },
                where:{
                    email:payload.email
                }
            })
            const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${payload.email}&token=${token}`;
            const html = await renderEmailEjs("forgot-password", {
                url:url
            });
            await emailQueue.add(emailQueueName, {
                to: payload.email,
                subject: "Reset Password",
                body: html,
            });


                  res.json({ message: "Email has been sent" });
                  return;
     } catch (error) {
            if (error instanceof ZodError ) {
              const errors = formatEror(error);
               res.status(422).json({ message: "Invalid data", errors });
            return;
            }
            console.error(error);
             res
              .status(500)
              .json({ message: "Something went wrong. Please try again later." });
              return;
          }
    });

    router.post("/reset-password",authLimiter, async (req: Request, res: Response):Promise<void> => {
        try {
            const body = req.body;
            const payload = passwordResetSchema.parse(body);
            const user = await prisma.user.findUnique({
                select: {
                  email: true,
                  passwordResetToken: true,
                  token_send_at: true,
                },
                where: { email: payload.email },
              });
            if(!user || user==null)  {
                 res.status(422).json({message:"Email not found",errors:{
                    email:"Check link again"
                }})
                return;
            } 
if(user.passwordResetToken !== payload.token){
     res.status(422).json({message:"link",errors:{
        email:"Check link again"
    }})
    return;
}
const hoursDiff = checkDateHourDifference(user.token_send_at!);
if(hoursDiff>2){
     res.status(422).json({message:"Token expired",errors
    :{emails:{message:"Token expired"}}})
    return;
    }

          const newSalt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(payload.password, newSalt);
            await prisma.user.update({
                data:{
                    password:newPassword,
                    passwordResetToken:null,
                    token_send_at:null
                },
                where:{
                    email:payload.email
                }
            })

                 res.json({message:"Password has been reset"});
return;
        } catch (error) {
            if (error instanceof ZodError ) {
              const errors = formatEror(error);
               res.status(422).json({ message: "Invalid data", errors });
           return;}
            console.error(error);
             res
              .status(500)
              .json({ message: "Something went wrong. Please try again later." });
              return;
          }
    });


export default router;
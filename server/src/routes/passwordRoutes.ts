import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { formatEror, renderEmailEjs } from "../helper.js";
import { ForgertPasswordSchema, passwordResetSchema } from "../validations/passwordvalidation.js";
import bcrypt from 'bcrypt';
import {v4 as uuid4} from 'uuid';
import prisma from "../config/database.js";
import { emailQueue, emailQueueName } from "../jobs/emailJobs.js";

const router = Router();

router.post("/forgot-password", async (req: Request, res: Response) => {
    try {
        // Send email to user with the link to reset password
        const body = req.body;
         const payload = ForgertPasswordSchema.parse(body)

                let user = await prisma.user.findUnique({where:{email:payload.email}})
            if(!user || user==null)  {
                return res.status(422).json({message:"Email not found",errors:{
                    email:"Email not found"
                }})
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
            const url = `${process.env.APP_URL}/reset-password?email=${payload.email}&token=${token}`;
            const html = await renderEmailEjs("forgot-password", {
                url:url
            });
            await emailQueue.add(emailQueueName, {
                to: payload.email,
                subject: "Reset Password",
                body: html,
            });


                 return res.json({ message: "Email has been sent" });
     } catch (error) {
            if (error instanceof ZodError ) {
              const errors = formatEror(error);
              return res.status(422).json({ message: "Invalid data", errors });
            }
            console.error(error);
            return res
              .status(500)
              .json({ message: "Something went wrong. Please try again later." });
          }
    });

    router.post("/reset-password", async (req: Request, res: Response) => {
        try {
            const body = req.body;
            const payload = passwordResetSchema.parse(body);
            const user = await prisma.user.findUnique({where:{email:payload.email}})
            if(!user || user==null)  {
                return res.status(422).json({message:"Email not found",errors:{
                    email:"Email not found"
                }})
            } 
            const salt = await bcrypt.genSalt(10);
            const hashedToken = await bcrypt.hash(payload.token, salt);
            if(hashedToken !== user.passwordResetToken){
                return res.status(422).json({message:"Invalid token",errors:{
                    token:"Invalid token"
                }})
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
            return res.json({message:"Password has been reset"});
        } catch (error) {
            if (error instanceof ZodError ) {
              const errors = formatEror(error);
              return res.status(422).json({ message: "Invalid data", errors });
            }
            console.error(error);
            return res
              .status(500)
              .json({ message: "Something went wrong. Please try again later." });
          }
    });


export default router;
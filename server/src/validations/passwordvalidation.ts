import { z } from "zod";
export const ForgertPasswordSchema = z.object({
    email: z.string({message:"Enter  Email"}).email({message:"Enter valid Email"}),
});
export const passwordResetSchema = z.object({    
   
    email: z.string({message:"Enter  Email"}).email({message:"Enter valid Email"}),
    password: z.string({message:"Enter Password"}).min(6,{message:"Password must be at least 6 characters long"}),
    confirm_password: z.string({message:"Enter Password"}).min(6),
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",path:["confirm_password"]
  });
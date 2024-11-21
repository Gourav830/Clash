import {z} from "zod";
export const registerSchema = z.object({    
    name: z.string({message:"Name is required"}).min(3,{message:"Name must be at least 3 characters long"}),
    email: z.string({message:"Enter  Email"}).email({message:"Enter valid Email"}),
    password: z.string({message:"Enter Password"}).min(6,{message:"Password must be at least 6 characters long"}),
    confirm_password: z.string({message:"Enter Password"}).min(6),
  }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",path:["confirm_password"]
  });
  export const loginSchema = z.object({ 
    email: z.string({message:"Enter  Email"}).email({message:"Enter valid Email"}),
    password: z.string({message:"Enter Password"}).min(6,{message:"Password must be at least 6 characters long"}),
  });

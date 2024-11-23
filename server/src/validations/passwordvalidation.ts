import { z } from "zod";
export const ForgertPasswordSchema = z.object({
    email: z.string({message:"Enter  Email"}).email({message:"Enter valid Email"}),
});
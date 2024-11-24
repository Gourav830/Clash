import { z } from "zod";
export const clashSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, {
      message: "Title must be at most 100 characters long",
    }),
  description: z
    .string({ message: "description is required" })
    .min(3, { message: "description must be at least 9 characters long" })
    .max(2000, {
      message: "description must be at most 2000 characters long",
    }),
  expires_at: z
    .string({ message: "Enter Expiry Date" })
    .min(5, { message: "Enter valid Date" }),  
});                           

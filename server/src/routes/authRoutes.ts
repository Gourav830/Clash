import { Router, Request, Response } from "express";
import { registerSchema } from "../validations/authValidations.js";
import { ZodError } from "zod";
import { formatEror } from "../helper.js";
const router = Router();
//REgister Route

router.post("/register", async (req: Request, res: Response) => {
  
  try {
    const body = req.body
    const payload = registerSchema.parse(body)
    res.json(payload)
  } 
  catch (error) {
    if(error instanceof ZodError){
      const errors = formatEror(error);
       res.status(422).json({message:"Invalid data",errors});
    
    }
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;

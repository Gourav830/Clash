


import { Router ,Request,Response} from "express";
import { ZodError } from "zod";
import { formatEror } from "../helper.js";
import { clashSchema } from "../validations/clashValidation.js";

const router = Router()

router.post('/' , async (req:Request,res:Response) => {
    
    
    try{
        // res.send('Hello World')
        const body = req.body
        const payload = clashSchema.parse(body)
        

    }catch (error) {
        if (error instanceof ZodError) {
          const errors = formatEror(error);
          return res.status(422).json({ message: "Invalid data", errors });
        }
        console.error(error);
        return res
          .status(500)
          .json({ message: "Something went wrong. Please try again later." });
      }
})










export default router;  
import { Router ,Request,Response} from "express";
import { ZodError } from "zod";
import { formatEror, imageValidator, uploadedFile } from "../helper.js";
import { clashSchema } from "../validations/clashValidation.js";
import { UploadedFile } from "express-fileupload";
import prisma from "../config/database.js";
import authMiddleware from "../middleware/authMiddleWare.js";

const router = Router()


router.get("/", async (req: Request, res: Response) => {
try{
    const clash = await prisma.clash.findMany({
        user_id : req.user?.id!
    })
    return res.json({message:"Clashed fached Successfully",data: clash})

}catch(error){
    console.error(error)
    return res.status(500).json({message: "Something went wrong. Please try again later."})
}

})










router.post("/", authMiddleware, async (req: Request, res: Response) => {
    
    try{
        const body = req.body
        const payload = clashSchema.parse(body)

        if(req.files?.image){
            const image:UploadedFile = req.files?.image as UploadedFile
            const validMsg = imageValidator(image?.size,image?.mimetype)
            if(validMsg){
                return res.status(422).json({message: 'Invalid data',errors: {image: validMsg}})
      }
    
   payload.image = await uploadedFile(image)
    
   
    }
    else{
        return res.status(422).json({errors: {image:"Image is required "}})
    }
    await prisma.clash.create({
        data: {
           ...payload,
           user_id: req.user?.id!,
           expires_at: new Date(payload.expires_at),
           iamge: payload.image!

        }
    })
return res.json({message: 'Clash created successfully'})


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
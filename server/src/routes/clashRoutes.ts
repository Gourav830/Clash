import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import { deleteImage, formatEror, imageValidator, uploadedFile } from "../helper.js";
import { clashSchema } from "../validations/clashValidation.js";
import { UploadedFile } from "express-fileupload";
import prisma from "../config/database.js";
import authMiddleware from "../middleware/authMiddleWare.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const clash = await prisma.clash.findMany({
      where: { user_id: req.user?.id! },
      orderBy: { created_at: "desc" },
    });
    return res.json({ message: "Clashed fached Successfully", data: clash });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const payload = clashSchema.parse(body);
    // console.log(payload);
    if (req.files?.image) {
      const image: UploadedFile = req.files?.image as UploadedFile;

      const validMsg = imageValidator(image?.size, image?.mimetype);
      
      if (validMsg) {
        return res
          .status(422)
          .json({errors: { image: validMsg } });
      }

      payload.image = await uploadedFile(image);
    } 
    else {
      return res.status(422).json({ errors: { image: "Image is required " } });
    }
    await prisma.clash.create({
      data: {
        title: payload.title,
        description: payload?.description,
        image: payload?.image,
        user_id: req.user?.id!,
        expires_at: new Date(payload.expires_at),
      },
    });
    return res.json({ message: "Clash created successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatEror(error);
      return res.status(422).json({ message: "Invalid data", errors });
    }
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});


router.get("/:id", async (req: Request, res: Response) => {
  try {

    const clash = await prisma.clash.findUnique({
      where: { id: Number(req.params.id) },
     
    });
    if (!clash) {
      return res.status(404).json({ message: "Clash not found" });
    }
    return res.json({ message: "Clash fetched successfully", data: clash });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
}) 
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const payload = clashSchema.parse(body);

    if (req.files?.image) {
      const image: UploadedFile = req.files?.image as UploadedFile;
      const validMsg = imageValidator(image?.size, image?.mimetype);
      if (validMsg) {
        return res
          .status(422)
          .json({ message: "Invalid data", errors: { image: validMsg } });
      }
      const clash = await prisma.clash.findUnique({
        where: { id: Number(id) },
        select:{
            image:true,
            id:true
          }
        });

if(clash){
      deleteImage(clash?.image!);
}payload.image = await uploadedFile(image);
    }
    await prisma.clash.update({
      where:{id:Number(id)},
      data: {
        ...payload,
        expires_at: new Date(payload.expires_at),
      },
    });
    return res.json({ message: "Clash updated successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = formatEror(error);
      return res.status(422).json({ message: "Invalid data", errors });
    }
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

router.delete("/:id", async (req: Request, res: Response)=>{
  try {
const {id} = req.params;    
    // const clash = await prisma.clash.findUnique({
    //   where: { id: Number(req.params.id) },
    // });


    const clash = await prisma.clash.findUnique({
      select:{
        image:true,
        id:true
      },
      where: { id: Number(id) },
    });

if(clash){
  deleteImage(clash?.image!);
}
    if (!clash) {
      return res.status(404).json({ message: "Clash not found" });
    }

    
    await prisma.clash.delete({
      where: { id: Number(id) },
    });
    return res.json({ message: "Clash deleted  successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
}) 
export default router;

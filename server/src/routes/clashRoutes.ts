import { Router, Request, Response } from "express";
import { ZodError } from "zod";
import {
  deleteImage,
  formatEror,
  imageValidator,
  uploadedFile,
} from "../helper.js";
import { clashSchema } from "../validations/clashValidation.js";
import { FileArray, UploadedFile } from "express-fileupload";
import prisma from "../config/database.js";
import authMiddleware from "../middleware/authMiddleWare.js";
// import { uploadedFile } from "../helper";
// import { REGISTER_URL } from '../../../front-end/src/lib/apiEndPoint';

const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response):Promise<void> => {
  try {
    const clash = await prisma.clash.findMany({
      where: { user_id: req.user?.id! },
      orderBy: { created_at: "desc" },
    });
     res.json({ message: "Clashed fached Successfully", data: clash });
    return;
    } catch (error) {
    console.error(error);
     res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
      return;
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response):Promise<void> => {
  try {
    const body = req.body;
    const payload = clashSchema.parse(body);
    if (req.files?.image) {
      const image: UploadedFile = req.files?.image as UploadedFile;

      const validMsg = imageValidator(image?.size, image?.mimetype);

      if (validMsg) {
         res.status(422).json({ errors: { image: validMsg } });
        return;
        }

      payload.image = await uploadedFile(image);
    } else {
      res.status(422).json({ errors: { image: "Image is required " } });
    return;
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
     res.json({ message: "Clash created successfully" });
  return;
    } catch (error) {
    if (error instanceof ZodError) {
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

router.get("/:id", async (req: Request, res: Response):Promise<void> => {
  try {
    const clash = await prisma.clash.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        ClashItems: {
          select: {
            image: true,
            id: true,
            count: true,
          },
        },
        ClashComments: {
          select: {
            id: true,
            comment: true,
            created_at: true,
          },
          orderBy: {
            id: "desc",
          },
        },
      },
    });
    if (!clash) {
       res.status(404).json({ message: "Clash not found" });
      return;
      }
    res.json({ message: "Clash fetched successfully", data: clash });
  return;
  }
   catch (error) {
    console.error(error);
     res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  return;
    }
});
router.put(
  "/:id",
  authMiddleware,
  authMiddleware,
  async (req: Request, res: Response):Promise<void> => {
    try {
      const { id } = req.params;
      const body = req.body;
      const payload = clashSchema.parse(body);

      if (req.files?.image) {
        const image: UploadedFile = req.files?.image as UploadedFile;
        const validMsg = imageValidator(image?.size, image?.mimetype);
        if (validMsg) {
           res
            .status(422)
            .json({ message: "Invalid data", errors: { image: validMsg } });
        return;
          }
        const clash = await prisma.clash.findUnique({
          where: { id: Number(id) },
          select: {
            image: true,
            id: true,
          },
        });

        if (clash) {
          deleteImage(clash?.image!);
        }
        payload.image = await uploadedFile(image);
      }
      await prisma.clash.update({
        where: { id: Number(id) },
        data: {
          ...payload,
          expires_at: new Date(payload.expires_at),
        },
      });
       res.json({ message: "Clash updated successfully" });
    return;
      } catch (error) {
      if (error instanceof ZodError) {
        const errors = formatEror(error);
         res.status(422).json({ message: "Invalid data", errors });
      return;
        }
      console.error(error);
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later." });
    }
    return;
  }
);

router.delete("/:id", authMiddleware, async (req: Request, res: Response):Promise<void>=>{
  try {
    const { id } = req.params;
    // const clash = await prisma.clash.findUnique({
    //   where: { id: Number(req.params.id) },
    // });

    const clash = await prisma.clash.findUnique({
      select: {
        image: true,
        id: true,
      },
      where: { id: Number(id) },
    });

    if (clash) {
      deleteImage(clash?.image!);
    }
    if (!clash) {
       res.status(404).json({ message: "Clash not found" });
      return;
    }

    await prisma.clash.delete({
      where: { id: Number(id) },
    });
     res.json({ message: "Clash deleted  successfully" });
 return;
    } catch (error) {
    console.error(error);
     res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  return;
    }
});

router.post("/items", authMiddleware, async (req: Request, res: Response):Promise<void> => {
  const { id } = req.body;

  const files: FileArray | null | undefined = req.files;
  let imgErrors: Array<string> = [];
  const images = files?.["images[]"] as UploadedFile[];
  if (images.length >= 2) {
    images.map((image) => {
      const validMsg = imageValidator(image?.size, image?.mimetype);
      if (validMsg) {
        imgErrors.push(validMsg);
      }
    });

    if (imgErrors.length > 0) {
       res.status(422).json({ errors: { images: imgErrors } });
      return;
      }

    let uploadedImages: string[] = [];
    images.map((img) => {
      uploadedImages.push(uploadedFile(img));
    });
    uploadedImages.map(async (item) => {
      await prisma.clashItem.create({
        data: {
          image: item,
          clash_id: Number(id),
        },
      });
    });
    res.json({ message: "clash Items added successfully!" });
    return;
  }
  res
    .status(422)
    .json({ errors: { images: "Please upload both images" } });
    return;
});

export default router;

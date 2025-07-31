import { Router, Request, Response } from "express";
import prisma from "../config/database.js";

const router = Router();
router.get("/verify-email", async (req: Request, res: Response) => {
  const { email, token } = req.query;
  if (!email || !token) {
    return res.redirect("/verify-error");
  }

  //Check if email exists
  const user = await prisma.user.findUnique({
    where: { email: email as string },
  });

  if (user) {
    if (token === user.email_verified_token) {
      await prisma.user.update({
        where: { email: email as string },
        data: { email_verified_at:new Date().toISOString(), email_verified_token: null },
      });

     return res.redirect(`${process.env.CLIENT_APP_URL}/login`);
    }
  }

  return res.redirect("/verify-error");
});
router.get("verify-error", (req: Request, res: Response) => {
  return res.render("auth/verifyEmailError");
});

export default router;

import { Router, Request, Response } from "express";
import { loginSchema, registerSchema } from "../validations/authValidations.js";
import { ZodError } from "zod";
import { formatEror, renderEmailEjs } from "../helper.js";
import prisma from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";
import { emailQueue, emailQueueName } from "../jobs/emailJobs.js";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleWare.js";
import { authLimiter } from "../config/rateLinit.js";

const router = Router();

// Register Route
router.post(
  "/register",
  authLimiter,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body;
      const payload = registerSchema.parse(body);

      // Check if user already exists
      const user = await prisma.user.findUnique({
        where: { email: payload.email },
      });
      if (user) {
        res.status(422).json({
          errors: { email: "Email already exists" },
        });
        return;
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(12);
      payload.password = await bcrypt.hash(payload.password, salt);

      // Generate token for email verification
      const token = await bcrypt.hash(uuid4(), salt);
      const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`;
      const emailBody = await renderEmailEjs("verify-email", {
        name: payload.name,
        url: url,
      });

      // Queue email for sending
      await emailQueue.add(emailQueueName, {
        to: payload.email,
        subject: "Clash Verify Email",
        body: emailBody,
      });

      // Save user to the database
      await prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          email_verified_token: token,
        },
      });

      res.json({ message: "Check your email to verify your account" });
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
  }
);

// Login Route
router.post(
  "/login",
  authLimiter,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body;
      const payload = loginSchema.parse(body);

      const user = await prisma.user.findUnique({
        where: { email: payload.email },
      });
      if (!user) {
        res.status(422).json({ errors: { email: "Invalid credentials" } });
        return;
      }

      const isMatch = await bcrypt.compare(payload.password, user.password);
      if (!isMatch) {
        res.status(422).json({ errors: { password: "Invalid credentials" } });
        return;
      }

      const JWT_payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(JWT_payload, process.env.JWT_SECRET_KEY!, {
        expiresIn: "365d",
      });

      res.json({
        message: "Login Success",
        data: {
          ...JWT_payload,
          token: `Bearer ${token}`,
        },
      });
      return;
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later." });
      return;
    }
  }
);

// Check Credentials Route
router.post(
  "/logincheck",
  authLimiter,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body;
      const payload = loginSchema.parse(body);

      const user = await prisma.user.findUnique({
        where: { email: payload.email },
      });
      if (!user) {
        res.status(422).json({ errors: { email: "Invalid credentials" } });
        return;
      }

      const isMatch = await bcrypt.compare(payload.password, user.password);
      if (!isMatch) {
        res.status(422).json({ errors: { password: "Invalid credentials" } });
        return;
      }

      res.json({ message: "Credentials are valid" });
      return;
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later." });
      return;
    }
  }
);

// Get User Route
router.get(
  "/user",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user;
    res.json({ data: user });
    return;
  }
);

export default router;

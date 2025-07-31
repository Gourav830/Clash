import { Router } from "express";
import authRoutes from "./authRoutes.js";
import verifyRoutes from "./verifyRoutes.js";
import passwordRoutes from "./passwordRoutes.js";
import clashRoutes from "./clashRoutes.js";
import authMiddleware from "../middleware/AuthMiddleWare.js";
const router = Router();

router.use("/", verifyRoutes);
router.use("/api/clash", clashRoutes);
router.use("/api/auth", authRoutes);
router.use("/api/auth", passwordRoutes);
export default router;

import {Router} from 'express';
import authRoutes from './authRoutes.js';
const router = Router();

router.use('/api/auth', authRoutes);

export default router;

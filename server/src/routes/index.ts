import {Router} from 'express';
import authRoutes from './authRoutes.js';
import verifyRoutes from './verifyRoutes.js';
import  passwordRoutes from './passwordRoutes.js';
const router = Router();

router.use('/', verifyRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/auth', passwordRoutes);
export default router;

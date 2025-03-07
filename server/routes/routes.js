import express from 'express';
import authRoutes from './authRoutes.js';
import userListHome from './userListHome.js'
import mediaRoutes from './mediaRoutes.js';

const router = express.Router();
// Use all routes
router.use('/auth', authRoutes);
router.use('/list',userListHome);
router.use('/media',mediaRoutes);


export default router;

import express from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';
import { uploadMedia } from '../controllers/mediaController.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'media_uploads', // Folder in your Cloudinary account
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'mov'], // Adjust allowed formats as needed
    },
});

const upload = multer({ storage });
const router = express.Router();

// POST /api/media/upload
router.post('/upload', upload.single('file'), uploadMedia);

export default router;

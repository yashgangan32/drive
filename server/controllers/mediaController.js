import Media from '../models/Media.js';

export const uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const { screenshotEnabled, downloadEnabled, viewOnceEnabled,uploadedBy, fileName } = req.body;

        // Create a new Media document using the Cloudinary URL from req.file.path
        const media = new Media({
            fileUrl: req.file.path,
            screenshotEnabled: screenshotEnabled === 'true',
            downloadEnabled: downloadEnabled === 'true',
            viewOnceEnabled: viewOnceEnabled ==='true',
            fileName: fileName || req.file.originalname,
            uploadedBy: uploadedBy, // or req.user._id if you're using auth middleware
        });

        await media.save();

        res.status(200).json({
            success: true,
            message: 'Media uploaded and saved successfully',
            media,
        });
    } catch (error) {
        console.error('Media upload error:', error);
        res.status(500).json({ success: false, message: 'Media upload failed', error: error.message });
    }
};

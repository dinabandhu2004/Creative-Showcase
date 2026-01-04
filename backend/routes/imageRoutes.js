const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadImage, getRandomImages, getUserImages, getMyImages } = require('../controllers/imageController');
const { protect } = require('../middleware/authMiddleware');

// Multer config
const { storage } = require('../config/cloudinary');

const upload = multer({
    storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

router.post('/upload', protect, upload.single('image'), uploadImage);
router.get('/random', getRandomImages);
router.get('/user/:username', getUserImages);
router.get('/myimages', protect, getMyImages);

module.exports = router;

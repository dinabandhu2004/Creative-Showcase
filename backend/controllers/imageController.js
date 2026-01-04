const Image = require('../models/Image');

// @desc    Upload image
// @route   POST /api/images/upload
// @access  Private
const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a file' });
    }

    const { title } = req.body;
    // req.file.path contains the local path to the file
    // We want to store a relative URL or path that the frontend can use
    // Since we are serving 'backend/uploads' as static at '/uploads', we can construct the URL.
    // Assuming backend is at localhost:5000, the image is at localhost:5000/uploads/filename

    // However, saving just the filename or relative path is often better.
    // Let's save the relative path 'uploads/filename'.

    const imageUrl = `uploads/${req.file.filename}`;

    const image = await Image.create({
        user: req.user.id,
        imageUrl,
        title,
    });

    // Populate user details so the frontend can display the username immediately
    await image.populate('user', 'username');

    res.status(201).json(image);
};

// @desc    Get random images for landing page
// @route   GET /api/images/random
// @access  Public
const getRandomImages = async (req, res) => {
    // Get all images and shuffle them or just get the latest for now.
    // Real "random" with large datasets requires aggregation $sample.
    try {
        const images = await Image.aggregate([{ $sample: { size: 20 } }]);
        // Populate user details if needed, but aggregate returns plain objects. 
        // We can do a second query or just use what we have. 
        // For simplicity let's just find().limit(20) if aggregate fails or is too complex for this step? No, $sample is fine.

        // Since aggregate returns plain objects and doesn't support populate automatically in the same pipeline easily without $lookup,
        // we can populate afterwards using Image.populate.
        await Image.populate(images, { path: 'user', select: 'username' });

        // If no images, return empty
        if (!images) {
            return res.status(200).json([]);
        }

        res.status(200).json(images);
    } catch (error) {
        // Fallback if aggregate fails generally
        const images = await Image.find().sort({ createdAt: -1 }).limit(20).populate('user', 'username');
        res.status(200).json(images);
    }
};

// @desc    Get user images
// @route   GET /api/images/user/:username
// @access  Public
const getUserImages = async (req, res) => {
    const { username } = req.params;

    // We need to find the user ID first because Image model references ObjectId
    const User = require('../models/User');
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const images = await Image.find({ user: user._id }).sort({ createdAt: -1 }).populate('user', 'username');
    res.status(200).json(images);
};

// @desc    Get my images (Dashboard)
// @route   GET /api/images/myimages
// @access  Private
const getMyImages = async (req, res) => {
    const images = await Image.find({ user: req.user.id }).sort({ createdAt: -1 }).populate('user', 'username');
    res.status(200).json(images);
};

module.exports = {
    uploadImage,
    getRandomImages,
    getUserImages,
    getMyImages
};

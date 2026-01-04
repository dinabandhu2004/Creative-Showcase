const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    imageUrl: { // This will store the local path or URL
        type: String,
        required: true
    },
    title: {
        type: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Image', imageSchema);

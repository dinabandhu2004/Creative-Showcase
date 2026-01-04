import React from 'react';
import { motion } from 'framer-motion';

const getSecureImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/400x300?text=No+Image';
    if (url.startsWith('http')) {
        return url.replace(/^http:\/\//i, 'https://');
    }
    // Fallback for old relative paths - assume they are broken or handle differently if needed.
    // Ideally, we shouldn't have relative paths anymore.
    return url;
};

const ImageCard = ({ image, onClick }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="card"
            onClick={onClick}
            style={{
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '1rem'
            }}
            whileHover={{ y: -5 }}
        >
            <img
                src={getSecureImageUrl(image.imageUrl)}
                alt={image.title || 'Artwork'}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="lazy"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'; }}
            />
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                color: 'white'
            }}>
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    @{image.user?.username || 'Unknown'}
                </div>
                {image.title && (
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                        {image.title}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ImageCard;

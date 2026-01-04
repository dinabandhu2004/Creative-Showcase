import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';

const ImageGrid = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '1.5rem',
                padding: '2rem 0'
            }}>
                <AnimatePresence>
                    {images.map((img) => (
                        <ImageCard
                            key={img._id}
                            image={img}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </AnimatePresence>
            </div>

            <ImageModal
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </>
    );
};

export default ImageGrid;

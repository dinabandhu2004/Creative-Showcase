import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

const ImageModal = ({ image, onClose }) => {
    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (image) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [image]);

    if (!image) return null;

    return (
        <AnimatePresence>
            {image && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.9)',
                        zIndex: 1000,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem'
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()} // Prevent close on content click
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '-40px',
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                fontSize: '2rem',
                                cursor: 'pointer'
                            }}
                        >
                            <IoClose />
                        </button>

                        <img
                            src={`http://localhost:5000/${image.imageUrl}`}
                            alt={image.title || 'Artwork'}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '80vh',
                                borderRadius: '8px',
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
                            }}
                        />

                        <div style={{
                            marginTop: '1rem',
                            textAlign: 'center',
                            color: 'white'
                        }}>
                            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
                                {image.title || 'Untitled'}
                            </h2>
                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#94a3b8' }}>
                                by <span style={{ color: '#6366f1', fontWeight: 'bold' }}>@{image.user?.username || 'Unknown'}</span>
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageModal;

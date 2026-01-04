import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import ImageGrid from '../components/ImageGrid';
import SkeletonCard from '../components/SkeletonCard';

const Landing = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await api.get('/images/random');
                setImages(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <header style={{
                    textAlign: 'center',
                    padding: '4rem 0',
                    backgroundImage: 'linear-gradient(to bottom, #1e293b, #0f172a)'
                }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#6366f1' }}>
                        Creative Showcase
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
                        Discover and share amazing digital artwork from creators around the world.
                    </p>
                </header>

                <main>
                    {loading ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '1.5rem',
                            padding: '2rem 0'
                        }}>
                            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    ) : (
                        <ImageGrid images={images} />
                    )}
                </main>
            </div>
        </div>
    );
};

export default Landing;

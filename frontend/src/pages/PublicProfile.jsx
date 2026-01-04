import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ImageGrid from '../components/ImageGrid';
import SkeletonCard from '../components/SkeletonCard';
import api from '../api';

const PublicProfile = () => {
    const { username } = useParams();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserImages = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await api.get(`/images/user/${username}`);
                setImages(res.data);
            } catch (error) {
                console.error(error);
                setError('User not found or has no images');
            } finally {
                setLoading(false);
            }
        };
        fetchUserImages();
    }, [username]);

    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '2rem' }}>
                <header style={{ marginBottom: '2rem', borderBottom: '1px solid #334155', paddingBottom: '1rem' }}>
                    <h2 style={{ fontSize: '2rem' }}>{username}'s Gallery</h2>
                </header>

                {error && <p style={{ color: '#ef4444' }}>{error}</p>}

                {loading ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        padding: '2rem 0'
                    }}>
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : (
                    <ImageGrid images={images} />
                )}
            </div>
        </div>
    );
};

export default PublicProfile;

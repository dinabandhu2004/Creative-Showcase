import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import UploadForm from '../components/UploadForm';
import ImageGrid from '../components/ImageGrid';
import SkeletonCard from '../components/SkeletonCard';
import api from '../api';

const Dashboard = () => {
    const [myImages, setMyImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchMyImages = async () => {
        setLoading(true);
        try {
            const res = await api.get('/images/myimages');
            setMyImages(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyImages();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>Welcome, {user?.username || 'Artist'}</h2>
                </div>

                <UploadForm onUploadSuccess={fetchMyImages} />

                <h3>Your Gallery</h3>
                {loading ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1.5rem',
                        padding: '2rem 0'
                    }}>
                        {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : (
                    <ImageGrid images={myImages} />
                )}
            </div>
        </div>
    );
};

export default Dashboard;

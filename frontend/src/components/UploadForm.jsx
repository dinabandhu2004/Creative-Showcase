import React, { useState } from 'react';
import api from '../api';

const UploadForm = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);

        try {
            await api.post('/images/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setTitle('');
            setFile(null);
            if (onUploadSuccess) onUploadSuccess();
        } catch (error) {
            console.error('Upload failed', error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            <h3>Upload New Artwork</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title (optional)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/*"
                    required
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
            </form>
        </div>
    );
};

export default UploadForm;

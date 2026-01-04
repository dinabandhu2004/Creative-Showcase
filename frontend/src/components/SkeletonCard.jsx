import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
            <div className="skeleton" style={{ width: '100%', height: '200px' }}></div>
            <div style={{ padding: '1rem' }}>
                <div className="skeleton" style={{ width: '60%', height: '20px', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
                <div className="skeleton" style={{ width: '40%', height: '15px', borderRadius: '4px' }}></div>
            </div>
        </div>
    );
};

export default SkeletonCard;

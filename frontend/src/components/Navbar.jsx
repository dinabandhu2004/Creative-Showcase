import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav style={{ padding: '1.5rem 0', borderBottom: '1px solid #334155' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                    Creative<span style={{ color: '#6366f1' }}>Showcase</span>
                </Link>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {user ? (
                        <>
                            <Link to="/dashboard" className="btn btn-outline">Dashboard</Link>
                            <button onClick={logout} className="btn btn-primary">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

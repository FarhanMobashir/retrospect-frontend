import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontSize: '3em', color: '#333' }}>Welcome to Memories App</h1>
            <p style={{ fontSize: '1.5em', color: '#666' }}>Your personal space to store and cherish your memories.</p>
            <div style={{ marginTop: '30px' }}>
                <Link to="/login" style={{ margin: '10px', padding: '10px 20px', textDecoration: 'none', color: '#fff', backgroundColor: '#007BFF', borderRadius: '5px' }}>Login</Link>
                <Link to="/register" style={{ margin: '10px', padding: '10px 20px', textDecoration: 'none', color: '#fff', backgroundColor: '#28A745', borderRadius: '5px' }}>Register</Link>
            </div>
        </div>
    );
};

export default Homepage;

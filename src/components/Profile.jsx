import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { authState, logout } = useContext(AuthContext);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Profile</h1>
            {authState.user ? (
                <div>
                    <p>Username: {authState.user.username}</p>
                    <button
                        onClick={logout}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#f44336',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};

export default Profile;

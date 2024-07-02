import React from 'react';
import { Link } from 'react-router-dom';

const AppLayout = ({ children }) => {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
        },
        content: {
            width: '100%',
            maxWidth: '600px',
            padding: '0 16px',
        },
        nav: {
            position: 'fixed',
            bottom: 0,
            width: '100%',
            maxWidth: '600px',
            backgroundColor: '#fff',
            borderTop: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px 0',
        },
        icon: {
            fontSize: '24px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {children}
            </div>
            <nav style={styles.nav}>
                <Link to="/memories" style={styles.icon}>📜</Link>
                <Link to="/new-memory" style={styles.icon}>➕</Link>
                <Link to="/profile" style={styles.icon}>👤</Link>
            </nav>
        </div>
    );
};

export default AppLayout;

import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MemoryList = () => {
    const [memories, setMemories] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const response = await fetch('http://localhost:8080/memories/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setMemories(data);
                } else {
                    console.error('Error fetching memories:', data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (authState.token) {
            fetchMemories();
        }
    }, [authState.token]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>All Your Memories</h1>
            <Link to="/new-memory" style={{ display: 'block', margin: '10px 0', padding: '10px', background: '#007BFF', color: '#fff', textAlign: 'center', borderRadius: '5px', textDecoration: 'none' }}>
                Create New
            </Link>
            {memories && memories.map(memory => (
                <div key={memory.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <h2 style={{ margin: '0 0 10px 0' }}>{memory.Title}</h2>
                    <p>{memory.Body}</p>
                </div>
            ))}
        </div>
    );
};

export default MemoryList;

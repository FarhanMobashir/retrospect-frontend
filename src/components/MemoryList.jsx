import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const MemoryList = () => {
    const [memories, setMemories] = useState([]);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/memories/`, {
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

    const deleteMemory = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/memories/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`
                }
            });
            if (response.ok) {
                setMemories(memories.filter(memory => memory.ID !== id));
                toast.success("Memory Deleted Successfully")
            } else {
                const data = await response.json();
                console.error('Error deleting memory:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>All Your Memories</h1>
            <Link
                to="/new-memory"
                style={{
                    display: 'block',
                    margin: '10px 0',
                    padding: '10px',
                    background: '#007BFF',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '5px',
                    textDecoration: 'none'
                }}>
                Create New
            </Link>
            {memories && memories.map(memory => (
                <div key={memory.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
                    <h2 style={{ margin: '0 0 10px 0' }}>{memory.Title}</h2>
                    <ReactQuill
                        value={memory.Body}
                        readOnly={true}
                        theme="bubble"
                    />
                    <button
                        onClick={() => deleteMemory(memory.ID)}
                        style={{
                            marginTop: '10px',
                            padding: '10px 20px',
                            backgroundColor: '#f44336',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'block'
                        }}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MemoryList;

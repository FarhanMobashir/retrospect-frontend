import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

const MemoryForm = ({ memory, onSubmit }) => {
    const [title, setTitle] = useState(memory ? memory.title : '');
    const [body, setBody] = useState(memory ? memory.body : '');
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { title, body };
            if (memory) {
                // Update existing memory
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/memories/${memory.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            } else {
                // Create new memory
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/memories/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authState.token}`
                    },
                    body: JSON.stringify(formData),
                });
            }
            // After successful submission, clear the form
            setTitle('');
            setBody('');
            toast.success('Memory saved successfully');
            // Navigate to /memories
            navigate('/memories');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                style={styles.input}
            />
            <ReactQuill
                value={body}
                onChange={setBody}
                placeholder="Body"
                style={styles.editor}
            />
            <button type="submit" style={styles.button}>Submit</button>
        </form>
    );
};

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    editor: {
        width: '100%',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        height: '300px',
        overflow: 'auto', // Enable scrolling within the editor
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default MemoryForm;

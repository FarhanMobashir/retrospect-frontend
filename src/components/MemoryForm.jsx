import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const MemoryForm = ({ memory, onSubmit }) => {
    const [title, setTitle] = useState(memory ? memory.title : '');
    const [body, setBody] = useState(memory ? memory.body : '');
    const { authState } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = { title, body };
            if (memory) {
                // Update existing memory
                await fetch(`http://localhost:8080/memories/${memory.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            } else {
                // Create new memory
                await fetch('http://localhost:8080/memories/', {
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
            // Invoke the onSubmit callback to handle any additional logic in the parent component
            onSubmit(formData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                style={{ margin: '10px', padding: '5px' }}
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Body"
                style={{ margin: '10px', padding: '5px', height: '100px', width: '300px' }}
            />
            <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
        </form>
    );
};

export default MemoryForm;

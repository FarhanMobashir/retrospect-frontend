import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MemoryDetail = () => {
    const { id } = useParams();
    const [memory, setMemory] = useState(null);

    useEffect(() => {
        // Fetch memory by ID from API
    }, [id]);

    return (
        <div style={{ padding: '20px' }}>
            {memory && (
                <>
                    <h2>{memory.title}</h2>
                    <p>{memory.description}</p>
                </>
            )}
        </div>
    );
};

export default MemoryDetail;

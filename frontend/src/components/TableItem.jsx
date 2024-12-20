import React, {useState, useEffect} from 'react';

const TableItem = ({ table, onDropParticipant }) => {

    const [isFull, setIsFull] = useState(false);

    useEffect(() => {
        determineFullness();
    }, []);

    const handleDrop = (event) => {
        event.preventDefault();
        const participantId = parseInt(event.dataTransfer.getData('participantId'), 10);
        onDropParticipant(table.id, participantId);
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow dropping
    };

    const determineFullness = async () => {
        console.log(table);
        const response = await fetch('http://localhost:9000/api/tables/full',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(table)
            }
        );

        if(response.ok){
            const data = await response.json();
            console.log(data);
            setIsFull(data);
        }
    }

    return (
        <div
            className={`table-item ${isFull ? 'full-table-a' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <h3>Table: {table.name}</h3>
        </div>
    );
};

export default TableItem;


import React from 'react';

const TableItem = ({ table, onDropParticipant }) => {

    const handleDrop = (event) => {
        event.preventDefault();
        const participantId = parseInt(event.dataTransfer.getData('participantId'), 10);
        onDropParticipant(table.id, participantId);
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow dropping
    };

    return (
        <div
            className="table-item"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <h3>Table: {table.name}</h3>
        </div>
    );
};

export default TableItem;


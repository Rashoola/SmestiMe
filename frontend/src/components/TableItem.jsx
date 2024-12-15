import React, { useState } from 'react';

const TableItem = ({ table, assignments, participants, onDropParticipant }) => {
    const [showParticipants, setShowParticipants] = useState(false);

    // Get the participants assigned to this table
    const assignedParticipants = assignments[table.id] || [];

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

            <button
                onClick={() => setShowParticipants((prev) => !prev)}
                className="toggle-participants-btn"
            >
                {showParticipants ? 'Hide Participants' : 'Show Participants'}
            </button>

            {showParticipants && (
                <ul className="participants-list">
                    {assignedParticipants.length > 0 ? (
                        assignedParticipants.map((participantId) => (
                            <li key={participantId}>
                                Participant ID: {participantId}
                            </li>
                        ))
                    ) : (
                        <li>No participants assigned to this table.</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default TableItem;


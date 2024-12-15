import React from 'react';

const ParticipantItem = ({ participant }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("participantId", participant.id);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="participant-item"
        >
            {participant.name}
        </div>
    );
};

export default ParticipantItem;
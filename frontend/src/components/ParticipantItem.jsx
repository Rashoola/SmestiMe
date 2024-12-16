import React from 'react';

const ParticipantItem = ({ participant }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("participantId", participant.id);
        console.log("ParticipationId:" + participant.id)
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="participant-item"
        >
            {participant.user.name}
        </div>
    );
};

export default ParticipantItem;
import React, {useState} from 'react';
import ParticipateBox from './ParticipateBox';

const ParticipantEventItem = ({ participant, event }) => {

    const [isParticipateBoxOpen, setIsParticipateBoxOpen] = useState(false);

    const handleParticipateClick = (e) => {
        setIsParticipateBoxOpen(true);
        console.log(event.id)
    }

    const handleCloseParticipateBox = (e) => {
        setIsParticipateBoxOpen(false);
    }

    return (
        <div className="event-item">
            <h3>{event.name}</h3>
            <p><strong>Место:</strong> {event.venue.name}</p>
            <p><strong>Датум:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <button onClick={handleParticipateClick}>Prijavi se</button>
            {isParticipateBoxOpen && <ParticipateBox event={event} participant={participant} onClose={handleCloseParticipateBox} />}
        </div>
    );
};

export default ParticipantEventItem;
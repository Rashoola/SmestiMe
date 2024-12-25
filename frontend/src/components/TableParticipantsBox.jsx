import React from 'react';
import '../style/TableParticipantsBox.css';

const TableParticipantsBox = ({participants}) => {
    return(
        <div className='table-participants-box'>
            <ul>
                {participants.map((participant) => (
                    <li key={participant.user.id}>{participant.user.name} {participant.user.surname}</li>
                ))}
            </ul>
        </div>
    );
};

export default TableParticipantsBox
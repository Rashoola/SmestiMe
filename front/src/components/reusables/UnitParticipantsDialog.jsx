import React from 'react';
import { useState, useEffect } from 'react';

const UnitParticipantsDialog = ({unit, isOpen, onClose}) => {
    const [participants, setParticipants] = useState([]);

    useEffect(
        () => {
            if(isOpen){
                fetchParticipants();
            }
        }, [isOpen]
    )
    const fetchParticipants = async () => {
        const url = `http://localhost:9000/api/participations/organization-unit/${unit.id}`;
        try{
            const response = await fetch(url);
            if(response.ok){
                const data = await response.json();
                setParticipants(data);
            } else {
                alert('Bad response from the server.');
            }
        }catch(err){
            alert('Error during connection to the server.');
        }
    }

    if(!isOpen){
        return null;
    }
  return (
    <div className='unit-participants-dialog'>
      <strong>Ucesnici:</strong>
      <ul>
        {participants.map((participant, index) => (
            <li key={index}>
                {participant.user.name + ' ' + participant.user.surname}
            </li>
        ))}
      </ul>
      <button onClick={onClose}>Izadji</button>
    </div>
  );
};

export default UnitParticipantsDialog;
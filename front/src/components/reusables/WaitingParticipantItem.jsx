import React from 'react';
import { useState } from 'react';

const WaitingParticipantItem = ({participation, onDrag}) => {
  const handleDrag = (e) => {
    onDrag(participation);
    e.dataTransfer.setData('application/json', JSON.stringify(participation));
  }
  return (
    <div style={{cursor: 'pointer'}} className='waiting-participant-item' draggable onDragStart={handleDrag}>
      <p>{participation.user.name + ' ' + participation.user.surname}</p>
    </div>
  );
};

export default WaitingParticipantItem;
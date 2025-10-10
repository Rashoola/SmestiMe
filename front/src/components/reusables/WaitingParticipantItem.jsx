import React from 'react';
import userSymbol from '../../images/user_symbol.png';
import '../../style/WaitingParticipantItem.css';

const WaitingParticipantItem = ({participation, onDrag}) => {
  const handleDrag = (e) => {
    onDrag(participation);
    e.dataTransfer.setData('application/json', JSON.stringify(participation));
  }
  return (
    <div style={{cursor: 'pointer'}} className='waiting-participant-item' draggable onDragStart={handleDrag}>
      <div className='symbol-container'>
        <img src={userSymbol} alt="" />
      </div>
      <div className='middle-part'>
      <strong style={{textTransform: 'uppercase'}}>{participation.user.name + ' ' + participation.user.surname}</strong>
      <p>И-мејл адреса: <span style={{fontWeight: 'bold'}}>{participation.user.email}</span></p>
      </div>
    </div>
  );
};

export default WaitingParticipantItem;
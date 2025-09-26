import React from 'react';

const WaitingParticipantItem = ({participation}) => {
  return (
    <div className='waiting-participant-item'>
      <p>{participation.user.name + ' ' + participation.user.surname}</p>
      <button>Rasporedi...</button>
    </div>
  );
};

export default WaitingParticipantItem;
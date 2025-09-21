import React from 'react';

const ParticipationItem = ({participation}) => {
  return (
    <div className='participation-item'>
      <strong>{participation.event.name}</strong>
      <p>{participation.event.date}</p>
      <button>Odaberi jedinicu</button>
    </div>
  );
};

export default ParticipationItem;
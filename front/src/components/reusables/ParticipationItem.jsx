import React from 'react';
import { useNavigate } from 'react-router-dom';

const ParticipationItem = ({participation}) => {
  const navigate = useNavigate();
  return (
    <div className='participation-item'>
      <strong>{participation.event.name}</strong>
      <p>{participation.event.date}</p>
      <button onClick={() => navigate(`/participation/${participation.id}`)}>Odaberi jedinicu</button>
    </div>
  );
};

export default ParticipationItem;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ParticipationItem = ({ participation }) => {
  const navigate = useNavigate();

  return (
    <div className="participation-item">
      <strong>{participation.event.name}</strong>
      <p>{participation.event.date}</p>

      {participation.organizationUnit === null ? (
        <button onClick={() => navigate(`/participation/${participation.id}`)}>
          Odaberi jedinicu
        </button>
      ) : (
        <p>Odabrana organizaciona jedinica: {participation.organizationUnit.name}</p>
      )}
    </div>
  );
};

export default ParticipationItem;

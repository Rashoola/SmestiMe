import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/ParticipationItem.css';

const ParticipationItem = ({ participation }) => {
  const navigate = useNavigate();

  const formatDateSerbian = (dateString) => {
    const months = [
      'januar', 'februar', 'mart', 'april', 'maj', 'jun',
      'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}. ${month} ${year}.`;
  };

  return (
    <div className="participation-item">
      <strong>{participation.event.name}</strong>
      <p>Datum održavanja: {formatDateSerbian(participation.event.date)}</p>

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

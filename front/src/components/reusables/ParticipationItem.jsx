import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/ParticipationItem.css';
import eventSymbol from '../../images/event_symbol.png';

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
      <div className='symbol-container'>
        <img src={eventSymbol} alt="" />
      </div>
      <div className='middle-part'>
      <strong>{participation.event.name}</strong>
      <p>Место одржавања: {participation.event.venue.name}, {participation.event.venue.address}</p>
      <p>Датум одржавања: {formatDateSerbian(participation.event.date)}</p>
      <p>{participation.event.description}</p>
      {participation.organizationUnit === null ? (
        <button onClick={() => navigate(`/participation/${participation.id}`)}>
          Одабери јединицу
        </button>
      ) : (
        <p style={{color: '#00d93a'}}>Odabrana organizaciona jedinica: {participation.organizationUnit.name}</p>
      )}
      </div>
    </div>
  );
};

export default ParticipationItem;

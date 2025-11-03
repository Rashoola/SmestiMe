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

  const handleCancelParticipation = async () => {
  const confirmCancel = window.confirm("Да ли сте сигурни да желите да откажете учешће?");
  if (!confirmCancel) return;

  const url = `http://localhost:9000/api/participations/${participation.id}/cancel`;

  try {
    const response = await fetch(url, { method: 'DELETE' });

    if (response.status === 404) {
      alert("Учешће није пронађено.");
      return;
    }

    if (!response.ok) {
      alert("Систем не може да откаже учешће.");
      return;
    }

    alert("Успешно отказивање учешћа.");

    // Optional: refresh participations
    window.location.reload();
    // await fetchParticipations();

  } catch (err) {
    alert("Грешка приликом повезивања.");
  }
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
      <button onClick={handleCancelParticipation}>Откажи учешће</button>
      </div>
    </div>
  );
};

export default ParticipationItem;

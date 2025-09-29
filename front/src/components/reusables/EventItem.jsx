import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/EventItem.css';

const EventItem = ({ event }) => {
  const navigate = useNavigate();

  // Helper function to format the date
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
    <div className='event-item'>
      <strong>{event.name}</strong>
      <p>Datum: {formatDateSerbian(event.date)}</p>
      <p>Lokacija: {event.venue.name}</p>

      <button onClick={() => navigate(`/event/${event.id}`)}>Prikazi podatke</button>
      <button onClick={() => navigate(`/event/${event.id}/distribution`)}>Raspored</button>
    </div>
  );
};

export default EventItem;

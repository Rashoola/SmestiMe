import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/EventItem.css';
import eventSymbol from '../../images/event_symbol.png';

const EventItem = ({ event }) => {
  const navigate = useNavigate();

  // Helper function to format the date
  const formatDateSerbian = (dateString) => {
    const months = [
      'јануар', 'фебруар', 'март', 'април', 'мај', 'јуни',
      'јули', 'август', 'септембар', 'октобар', 'новембар', 'децембар'
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}. ${month} ${year}.`;
  };

  return (
    <div className='event-item'>
      <div className='symbol-container'>
        <img src={eventSymbol} alt="" />
      </div>
      <div className='middle-part'>
      <strong style={{textTransform: 'uppercase'}}>{event.name}</strong>
      <p>Датум: {formatDateSerbian(event.date)}</p>
      <p>Локација: {event.venue.name}</p>

      <button onClick={() => navigate(`/event/${event.id}`)}>Прикажи податке</button>
      <button onClick={() => navigate(`/event/${event.id}/distribution`)}>Распоред</button>
      </div>
    </div>
  );
};

export default EventItem;

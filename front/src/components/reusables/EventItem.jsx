import React from 'react';
import { useNavigate } from 'react-router-dom';

const EventItem = ({event}) => {
  const navigate = useNavigate();
  return (
    <div>
      <p>{event.name}</p>
      <p>{event.date}</p>
      <p>{event.venue.name}</p>

      <button onClick={() => navigate(`/event/${event.id}`)}>Prikazi podatke</button>
      <button onClick={() => navigate(`/event/${event.id}/distribution`)}>Raspored</button>
    </div>
  );
};

export default EventItem;
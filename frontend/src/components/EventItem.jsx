import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EventItem = ({ event }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/events/${event.id}`, { state: { event } });
  };

  return (
    <div className="event-item">
      <h3>{event.name}</h3>
      <p><strong>Место:</strong> {event.venue.name}</p>
      <p><strong>Датум:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <Link to={`/events/${event.id}`} className="details-button">
        Детаљи
      </Link>
    </div>
  );
};

export default EventItem;
import React from 'react';

const EventItem = ({event}) => {
  return (
    <div>
      <p>{event.name}</p>
      <p>{event.date}</p>
      <p>{event.venue.name}</p>

      <button>Prikazi podatke</button>
    </div>
  );
};

export default EventItem;
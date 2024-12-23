import React, { useState, useEffect } from 'react';
import ParticipantEventItem from './ParticipantEventItem';
import "../style/EventList.css";

const ParticipantEventList = ({participant}) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/events');
      if (!response.ok) {
        alert("Учитавање листе догађаја није успело");
        return;
      }
      const data = await response.json();
      console.log(data)
      setEvents(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchEvents();
    const intervalId = setInterval(fetchEvents, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <div className="events">
      <h2>Тренутни догађаји:</h2>
      {error && <p className="error-message">{error}</p>}
      {events.length === 0 ? (
        <p>Тренутно нема догађаја за приказ.</p>
      ) : (
        events.map((event) => <ParticipantEventItem key={event.id} event={event} participant={participant} />)
      )}
    </div>
  );
};

export default ParticipantEventList;
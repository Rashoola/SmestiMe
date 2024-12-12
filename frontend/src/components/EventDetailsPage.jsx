import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/EventDetailsPage.css';

const EventDetailsPage = () => {
  const { id } = useParams(); // Extract event ID from URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the event details
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/events/${id}`);
        console.log(`http://localhost:9000/api/events/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      <p><strong>Опис:</strong> {event.description}</p>
      <p><strong>Датум:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Код за улаз:</strong> {event.entryCode}</p>

      <div className="venue-details">
        <h3>Место одржавања</h3>
        <p><strong>Назив:</strong> {event.venue.name}</p>
        <p><strong>Адреса:</strong> {event.venue.address}</p>
        <p><strong>Контакт:</strong> {event.venue.contact}</p>
        <p><strong>Сале:</strong> {event.venue.halls.map((hall) => hall.name).join(', ')}</p>
      </div>

      <div className="booked-halls">
        <h3>Резервисане сале</h3>
        {event.bookedHalls.length > 0 ? (
          <ul>
            {event.bookedHalls.map((booked) => (
              <li key={booked.id}>{booked.hall.name}</li>
            ))}
          </ul>
        ) : (
          <p>Нема резервисаних сала.</p>
        )}
      </div>
    </div>
  );
};

export default EventDetailsPage;
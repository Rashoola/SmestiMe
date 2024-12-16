import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../style/EventDetailsPage.css';
import AddTablesBox from './AddTablesBox';
import HallBookingItem from './HallBookingItem';

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:9000/api/events/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event details');
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

  const handleAddTables = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

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
          event.bookedHalls.map((booked) => (
            <HallBookingItem
              key={booked.id}
              event={event}
              booking={booked}
              onAddTables={handleAddTables}
            />
          ))
        ) : (
          <p>Нема резервисаних сала.</p>
        )}
      </div>

      {showModal && (
        <AddTablesBox
          bookingId={selectedBookingId}
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
            // Optionally refetch event details or show a success message
          }}
        />
      )}
    </div>
  );
};

export default EventDetailsPage;


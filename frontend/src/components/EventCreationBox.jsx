import React, { useState, useEffect } from 'react';
import '../style/EventCreationBox.css';

const EventCreationBox = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    entryCode: '',
    venueId: '',
    hallIds: [],
  });
  const [venues, setVenues] = useState([]);
  const [availableHalls, setAvailableHalls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/venues');
        const data = await response.json();
        setVenues(data);
      } catch (err) {
        setError('Failed to fetch venues');
      }
    };

    fetchVenues();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVenueChange = (e) => {
    const venueId = e.target.value;
    const selectedVenue = venues.find((venue) => venue.id === parseInt(venueId, 10));

    // Update available halls for the selected venue
    const halls = selectedVenue?.halls || [];
    setAvailableHalls(halls);

    setFormData((prev) => ({
      ...prev,
      venueId: venueId ? parseInt(venueId, 10) : '',
      hallIds: [], // Reset hall selection when venue changes
    }));
  };

  const handleHallsChange = (e) => {
    const hallIds = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
    setFormData((prev) => ({ ...prev, hallIds }));
  };

  const handleSubmit = async () => {
    const event = {
      name: formData.name,
      description: formData.description,
      date: formData.date,
      venueId: formData.venueId,
      entryCode: formData.entryCode,
      hallIds: formData.hallIds,
    };

    try {
      const response = await fetch('http://localhost:9000/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const result = await response.json();
      console.log('Event created:', result);
      alert("Догађај је успешно креиран.");
      onClose(); // Close the modal
    } catch (err) {
      console.error(err);
      setError('Failed to create event');
    }
  };

  return (
    <div className="event-creation-box">
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <h2 className="modal-title">Креирај нови догађај</h2>
        <form className="modal-form">
          <label>
            Име:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Унесите име догађаја"
            />
          </label>
          <label>
            Опис:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Унесите опис догађаја"
            ></textarea>
          </label>
          <label>
            Датум:
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>
          <label>
            Улазни код:
            <input
              type="text"
              name="entryCode"
              value={formData.entryCode}
              onChange={handleChange}
              placeholder="Унесите улазни код"
            />
          </label>
          <label>
            Место одржавања:
            <select name="venueId" value={formData.venueId} onChange={handleVenueChange}>
              <option value="">Изаберите место</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Сале:
            <select
              name="hallIds"
              multiple
              value={formData.hallIds}
              onChange={handleHallsChange}
            >
              {availableHalls.map((hall) => (
                <option key={hall.id} value={hall.id}>
                  {hall.name}
                </option>
              ))}
            </select>
          </label>
          <div className="modal-buttons">
            <button type="button" className="action-button" onClick={handleSubmit}>
              Креирај
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Откажи
            </button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default EventCreationBox;


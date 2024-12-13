import React, { useState, useEffect } from 'react';
import '../style/EventCreationBox.css';

const EventCreationBox = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    entryCode: '',
    venue: '',
    halls: [],
  });

  const [venues, setVenues] = useState([]); // State to store venues
  const [halls, setHalls] = useState([]); // State to store halls for the selected venue
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  // Fetch venues from backend
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:9000/api/venues'); // Adjust the endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch venues');
        }
        const data = await response.json();
        setVenues(data); // Assuming the backend returns an array of venues
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  // Update halls when a venue is selected
  const handleVenueChange = (e) => {
    const selectedVenue = e.target.value;
    setFormData((prev) => ({ ...prev, venue: selectedVenue, halls: [] }));

    // Find the selected venue in the venues array
    const venue = venues.find((venue) => venue.name === selectedVenue);
    if (venue) {
      setHalls(venue.halls); // Set halls for the selected venue
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHallsChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, halls: options }));
  };

  const handleSubmit = () => {
    // Replace this with the actual API call
    console.log('Event data to send:', formData);
    onClose();
  };

  return (
    <div className="event-creation-box">
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <h2 className="modal-title">Креирај нови догађај</h2>
        {loading ? (
          <p>Loading venues...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
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
              <select name="venue" value={formData.venue} onChange={handleVenueChange}>
                <option value="">Изаберите место</option>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.name}>
                    {venue.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Сале:
              <select
                name="halls"
                multiple
                value={formData.halls}
                onChange={handleHallsChange}
              >
                {halls.map((hall) => (
                  <option key={hall.id} value={hall.name}>
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
        )}
      </div>
    </div>
  );
};

export default EventCreationBox;
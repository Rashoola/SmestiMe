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
  const [validationErrors, setValidationErrors] = useState({});

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

    const halls = selectedVenue?.locations || [];
    setAvailableHalls(halls);

    setFormData((prev) => ({
      ...prev,
      venueId: venueId ? parseInt(venueId, 10) : '',
      hallIds: [],
    }));
  };

  const handleHallsChange = (e) => {
    const hallIds = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
    setFormData((prev) => ({ ...prev, hallIds }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Име догађаја је обавезно.';
    if (!formData.description.trim()) errors.description = 'Опис догађаја је обавезан.';
    if (!formData.date) {
      errors.date = 'Датум је обавезан.';
    } else if (new Date(formData.date) < new Date()) {
      errors.date = 'Датум мора бити у будућности.';
    }
    if (!formData.entryCode.trim()) errors.entryCode = 'Улазни код је обавезан.';
    if (!formData.venueId) errors.venueId = 'Место одржавања је обавезно.';
    if (formData.hallIds.length === 0) errors.hallIds = 'Морате изабрати најмање једну салу.';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const event = {
      name: formData.name,
      description: formData.description,
      date: formData.date,
      venueId: formData.venueId,
      entryCode: formData.entryCode,
      locationIds: formData.hallIds,
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
        alert("Дошло је до грешке приликом чувања догађаја.");
        return;
      }

      const result = await response.json();
      alert('Догађај је успешно креиран.');
      onClose();
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
            {validationErrors.name && <p className="error-message">{validationErrors.name}</p>}
          </label>
          <label>
            Опис:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Унесите опис догађаја"
            ></textarea>
            {validationErrors.description && (
              <p className="error-message">{validationErrors.description}</p>
            )}
          </label>
          <label>
            Датум:
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
            {validationErrors.date && <p className="error-message">{validationErrors.date}</p>}
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
            {validationErrors.entryCode && (
              <p className="error-message">{validationErrors.entryCode}</p>
            )}
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
            {validationErrors.venueId && <p className="error-message">{validationErrors.venueId}</p>}
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
            {validationErrors.hallIds && <p className="error-message">{validationErrors.hallIds}</p>}
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


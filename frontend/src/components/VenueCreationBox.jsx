import React, { useState } from 'react';
import '../style/VenueCreationBox.css';

const VenueCreationBox = ({ onClose }) => {
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [hallName, setHallName] = useState('');
  const [halls, setHalls] = useState([]);
  const [error, setError] = useState(null);

  const validateInputs = () => {
    if (!venueName.trim()) {
      return 'Назив места је обавезан.';
    }
    if (!address.trim()) {
      return 'Адреса је обавезна.';
    }
    if (!contact.trim() || !/^\+?\d+$/.test(contact.trim())) {
      return 'Контакт телефон мора бити исправан.';
    }
    if (halls.length === 0) {
      return 'Морате додати најмање једну салу.';
    }
    return null;
  };

  const handleAddHall = () => {
    if (hallName.trim()) {
      setHalls([...halls, { name: hallName.trim() }]);
      setHallName('');
      setError(null); // Clear errors related to halls
    } else {
      setError('Назив сале не сме бити празан.');
    }
  };

  const handleConfirm = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    const venueData = {
      name: venueName,
      address,
      contact,
      halls,
    };

    try {
      const response = await fetch('http://localhost:9000/api/venues/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(venueData),
      });

      if (response.ok) {
        alert('Успешно креирање места.');
        onClose();
      } else {
        setError('Дошло је до грешке при креирању места.');
      }
    } catch (err) {
      setError('Немогуће је повезати се са сервером.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Креирање места одржавања</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label>Назив места</label>
          <input
            type="text"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            placeholder="Унесита назив места"
          />
        </div>
        <div className="input-group">
          <label>Адреса</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Унесите адресу"
          />
        </div>
        <div className="input-group">
          <label>Контакт телефон</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Унесите контакт телефон"
          />
        </div>
        <div className="input-group">
          <label>Сале</label>
          <div className="hall-input">
            <input
              type="text"
              value={hallName}
              onChange={(e) => setHallName(e.target.value)}
              placeholder="Унесите назив сале"
            />
            <button onClick={handleAddHall}>Додај салу</button>
          </div>
          <ul className="hall-list">
            {halls.map((hall, index) => (
              <li key={index}>{hall.name}</li>
            ))}
          </ul>
        </div>
        <div className="button-group">
          <button onClick={handleConfirm} className="confirm-button">
            Потврди унос
          </button>
          <button onClick={onClose} className="cancel-button">
            Затвори
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueCreationBox;


import React, { useState, useEffect } from 'react';
import '../style/VenueCreationBox.css';

const VenueCreationBox = ({ onClose }) => {
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [hallName, setHallName] = useState('');
  const [hallType, setHallType] = useState('');
  const [hallTypes, setHallTypes] = useState([]); // fetched from backend
  const [halls, setHalls] = useState([]);
  const [error, setError] = useState(null);

  // fetch hall types on mount
  useEffect(() => {
    const fetchHallTypes = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/hall-types');
        if (response.ok) {
          const data = await response.json(); // ["HALL", "EXCURSION", ...]
          setHallTypes(data);
          if (data.length > 0) {
            setHallType(data[0]); // default: first type
          }
        } else {
          setError('Неуспешно учитавање типова сала.');
        }
      } catch (err) {
        setError('Немогуће је повезати се са сервером.');
      }
    };
    fetchHallTypes();
  }, []);

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
    if (hallName.trim() && hallType) {
      setHalls([...halls, { name: hallName.trim(), type: hallType }]);
      setHallName('');
      setHallType(hallTypes.length > 0 ? hallTypes[0] : '');
      setError(null);
    } else {
      setError('Назив и тип сале су обавезни.');
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
      locations: halls.map((h) => ({
        name: h.name,
        locationType: h.type, // directly send string type
      })),
    };
    console.log(venueData);
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

        <label>Назив места</label>
        <input
          type="text"
          value={venueName}
          onChange={(e) => setVenueName(e.target.value)}
          placeholder="Унесита назив места"
        />

        <label>Адреса</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Унесите адресу"
        />

        <label>Контакт телефон</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Унесите контакт телефон"
        />

        <label>Сале</label>
        <div className="hall-input">
          <input
            type="text"
            value={hallName}
            onChange={(e) => setHallName(e.target.value)}
            placeholder="Унесите назив сале"
          />
          <select
            value={hallType}
            onChange={(e) => setHallType(e.target.value)}
          >
            {hallTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <button onClick={handleAddHall}>Додај салу</button>

          <ul className="hall-list">
            {halls.map((hall, index) => (
              <li key={index}>
                {hall.name} ({hall.type})
              </li>
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




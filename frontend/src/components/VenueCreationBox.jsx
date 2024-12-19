import React, { useState } from 'react';
import '../style/VenueCreationBox.css';

const VenueCreationBox = ({ onClose }) => {
  const [venueName, setVenueName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [hallName, setHallName] = useState('');
  const [halls, setHalls] = useState([]);

  const handleAddHall = () => {
    if (hallName.trim()) {
      setHalls([...halls, {name:hallName.trim()}]);
      setHallName('');
    }
  };

  const handleConfirm = async () => {
    const venueData = {
      name: venueName,
      address,
      contact,
      halls,
    };
    console.log(JSON.stringify(venueData));
    const response = await fetch('http://localhost:9000/api/venues/create',
        {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(venueData)
        }
    );

    if(response.ok){
        alert("Successfull creation of a venue.");
    } else {
        alert("An error ocurred.");
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Креирање места одржавања</h2>
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
          <button onClick={handleConfirm} className="confirm-button">Потврди унос</button>
          <button onClick={onClose} className="cancel-button">Затвори</button>
        </div>
      </div>
    </div>
  );
};

export default VenueCreationBox;

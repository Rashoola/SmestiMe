import React, { useState, useEffect } from 'react';
import OrganizationUnitItem from './OrganizationUnitItem';
import '../../style/BookingDialog.css';

const BookingDialog = ({
  isOpen,
  booking,
  organizationUnits,
  setOrganizationUnits,
  onClose,
}) => {
  const [unitTypes, setUnitTypes] = useState([]);

  const [form, setForm] = useState({
    unitType: '',
    name: '',
    capacity: '',
  });

  const fetchUnitTypes = async () => {
    const url = `http://localhost:9000/api/organization-units/types?locationType=${booking.location.locationType}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setUnitTypes(data);
      }
    } catch (err) {
      alert('An error during connection for unit types.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUnit = (bookingName) => {
    if (!form.unitType || !form.name || !form.capacity) {
      alert('Popunite sva polja');
      return;
    }

    // Check if a unit with the same type + name already exists
    const alreadyExists = organizationUnits.some(
      (unit) =>
        unit.unitType === form.unitType &&
        unit.name.trim().toLowerCase() === form.name.trim().toLowerCase()
    );

    if (alreadyExists) {
      alert('Ova organizaciona jedinica je već dodata.');
      return;
    }

    const newUnit = {
      id: null,
      unitType: form.unitType,
      name: form.name.trim(),
      capacity: Number(form.capacity),
    };

    setOrganizationUnits([...organizationUnits, newUnit]);

    // reset form
    setForm({ unitType: '', name: '', capacity: '' });
  };

  const handleRemoveUnit = (unitName) => {
  const newUnits = organizationUnits.filter((unit) => unit.name !== unitName);
  setOrganizationUnits(newUnits);
};


  useEffect(() => {
    fetchUnitTypes();
  }, [booking]);

  const getUnitTypeTranslation = (value) => {
    switch(value){
      case 'TABLE': return 'Сто';
      case 'ROOM': return 'Просторија';
      case 'BUS': return 'Аутобус';
      case 'CAR': return 'Аутомобил';
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="booking-dialog-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="booking-dialog"
        style={{
          padding: '1rem',
          width: '33%',
          height: '80%',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            border: 'none',
            background: 'transparent',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        

        <div className="organization-unit-input" style={{ marginTop: '1rem' }}>
          <label htmlFor="unit-type">Тип јединице</label>
          <select
            name="unitType"
            value={form.unitType}
            onChange={handleChange}
          >
            <option value=""> --Одаберите тип јединице--</option>
            {unitTypes.map((type, index) => (
              <option key={index} value={type}>
                {getUnitTypeTranslation(type)}
              </option>
            ))}
          </select>

          <label>Назив</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <label>Капацитет</label>
          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
          />

          <button type="button" onClick={() => handleAddUnit(booking.location.name)}>
            Додај
          </button>
        </div>

        <div className="organization-unit-list" style={{ marginTop: '1rem' }}>
          <ul>
            {organizationUnits.map((unit) => (
              <li key={unit.id ?? unit.name}>
                <OrganizationUnitItem key={unit.id ?? unit.name} unit={unit} onRemove={() => handleRemoveUnit(unit.name)} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingDialog;


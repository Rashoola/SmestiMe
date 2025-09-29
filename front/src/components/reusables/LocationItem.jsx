import React from 'react';
import '../../style/LocationItem.css';

const LocationItem = ({location, onRemove}) => {
  return (
    <div className='location-item'>
        <strong>Naziv: {location.name}</strong>
        <p>Tip lokacije: {location.locationType === 'HALL' ? 'sala' : 'ekskurzija'}</p>
        <button onClick={onRemove}>Ukloni</button>
    </div>
  );
};

export default LocationItem;
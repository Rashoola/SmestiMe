import React from 'react';

const LocationItem = ({location, onRemove}) => {
  return (
    <div>
        <p>{location.name}</p>
        <p>{location.locationType === 'HALL' ? 'sala' : 'ekskurzija'}</p>
        <button onClick={onRemove}>Ukloni</button>
    </div>
  );
};

export default LocationItem;
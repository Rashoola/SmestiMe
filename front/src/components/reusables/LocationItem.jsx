import React from 'react';

const LocationItem = ({location}) => {
  return (
    <div>
        <p>{location.name}</p>
        <p>{location.type === 'HALL' ? 'sala' : 'ekskurzija'}</p>
        <button>Ukloni</button>
    </div>
  );
};

export default LocationItem;
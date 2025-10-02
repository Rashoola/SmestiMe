import React from 'react';
import '../../style/LocationItem.css';
import hallSymbol from '../../images/hall_symbol.png';
import excursionSymbol from '../../images/excursion_symbol.png';

const LocationItem = ({location, onRemove}) => {
  return (
    <div className='location-item'>
      <div className='symbol-container'>
        {location.locationType === 'HALL' ? <img src={hallSymbol}></img> : <img src={excursionSymbol}></img>}
      </div>
      <div className='data-container'>
        <strong>Naziv: {location.name}</strong>
        <p>Tip lokacije: {location.locationType === 'HALL' ? 'sala' : 'ekskurzija'}</p>
        <button onClick={onRemove}>Ukloni</button>
        </div>
    </div>
  );
};

export default LocationItem;
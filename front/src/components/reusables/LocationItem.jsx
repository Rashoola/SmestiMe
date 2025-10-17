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
        <strong>{location.name}</strong>
        <p style={{margin: 0}}>Тип: {location.locationType === 'HALL' ? 'Сала' : 'Превоз'}</p>
        <button onClick={onRemove}>Уклони</button>
        </div>
    </div>
  );
};

export default LocationItem;
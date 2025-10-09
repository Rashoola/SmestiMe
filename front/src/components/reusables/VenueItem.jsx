import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../../style/VenueItem.css';
import venueSymbol from '../../images/venue_symbol.png';

const VenueItem = ({venue}) => {
    const navigate = useNavigate();
  return (
    <div className='venue-item'>
      <div className='symbol-container'>
        <img src={venueSymbol} alt="" />
      </div>
      <div className='middle-part'>
      <strong style={{textTransform: 'uppercase'}}>{venue.name}</strong>
      <p>Адреса: {venue.address}</p>

      <button onClick={() => navigate(`/venue/${venue.id}`)}>Прикажи податке</button>
      </div>
    </div>
  );
};

export default VenueItem;
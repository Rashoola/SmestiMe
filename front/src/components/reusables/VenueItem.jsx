import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../../style/VenueItem.css';

const VenueItem = ({venue}) => {
    const navigate = useNavigate();
  return (
    <div className='venue-item'>
      <p>Naziv: {venue.name}</p>
      <p>Adresa: {venue.address}</p>

      <button onClick={() => navigate(`/venue/${venue.id}`)}>Prikazi podatke</button>
    </div>
  );
};

export default VenueItem;
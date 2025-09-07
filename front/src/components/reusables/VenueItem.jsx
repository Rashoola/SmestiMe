import React from 'react';
import {useNavigate} from 'react-router-dom';

const VenueItem = ({venue}) => {
    const navigate = useNavigate();
  return (
    <div>
      <p>{venue.name}</p>
      <p>{venue.address}</p>

      <button onClick={() => navigate(`/venue/${venue.id}`)}>Prikazi podatke</button>
    </div>
  );
};

export default VenueItem;
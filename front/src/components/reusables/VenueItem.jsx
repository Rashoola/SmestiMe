import React from 'react';

const VenueItem = ({venue}) => {
  return (
    <div>
      <p>{venue.name}</p>
      <p>{venue.address}</p>

      <button>Prikazi podatke</button>
    </div>
  );
};

export default VenueItem;
import React from 'react';

const ParticipationBookingItem = ({booking}) => {
  return (
    <div className='participation-booking-item'>
      <p>{booking.location.name}</p>
      <button>Pogledaj organizacione jedinice</button>
    </div>
  );
};

export default ParticipationBookingItem;
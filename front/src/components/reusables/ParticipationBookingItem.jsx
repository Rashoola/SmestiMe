import React from 'react';
import OrganizationUnitDisplayItem from './OrganizationUnitDisplayItem';

const ParticipationBookingItem = ({booking}) => {
  return (
    <div className='participation-booking-item'>
      <p>{booking.location.name}</p>
      <div className='participation-booking-organization-units'>
        <ul>
          {booking.organizationUnits.map(
            (unit, index) => (
              <li key={index}>
                <OrganizationUnitDisplayItem unit={unit}></OrganizationUnitDisplayItem>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ParticipationBookingItem;
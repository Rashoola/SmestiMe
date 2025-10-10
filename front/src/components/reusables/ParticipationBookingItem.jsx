import React from 'react';
import OrganizationUnitDisplayItem from './OrganizationUnitDisplayItem';
import '../../style/ParticipationBookingItem.css';

const ParticipationBookingItem = ({booking, participation}) => {
  return (
    <div className='participation-booking-item'>
      <p style={{fontSize: 25, fontWeight: 'bold', textTransform: 'uppercase'}}>{booking.location.name}</p>
      <div className='participation-booking-organization-units'>
        <ul>
          {booking.organizationUnits.map(
            (unit, index) => (
              <li key={index}>
                <OrganizationUnitDisplayItem unit={unit} participation={participation}></OrganizationUnitDisplayItem>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default ParticipationBookingItem;
import React from 'react';
import OrganizationUnitChoiceItem from './OrganizationUnitChoiceItem';
import '../../style/BookingDisplayItem.css';

const BookingDisplayItem = ({booking, draggedParticipant}) => {
  return (
    <div className='booking-display-item'>
        <strong style={{marginBottom: 20, textTransform: 'uppercase', fontSize: 20}}>{booking.location.name}</strong>
        <ul>
            {booking.organizationUnits.map(
                (unit, index) => (
                    <li key={index}>
                        <OrganizationUnitChoiceItem unit={unit} draggedParticipant={draggedParticipant}></OrganizationUnitChoiceItem>
                    </li>
                )
            )}
        </ul>
    </div>
  );
};

export default BookingDisplayItem;
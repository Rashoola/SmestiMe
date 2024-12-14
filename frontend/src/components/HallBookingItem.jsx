import React from 'react';

const HallBookingItem = ({eventId, hall}) => {
    return (
        <div className='item'>
            <p>Naziv sale: {hall}</p>
            <button>Dodaj stolove</button>
        </div>
    );
};

export default HallBookingItem;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/HallBookingItem.css';

const HallBookingItem = ({ event, booking, onAddTables }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        // Navigate to SittingArrangementPage and pass the booking object as state
        console.log(booking);
        navigate(`/arrangement`, { state: { event, booking } });
    };

    return (
        <div className="hall-booking-item">
            <p><strong>Сала:</strong> {booking.hall.name}</p>
            <button onClick={() => onAddTables(booking.id)}>Додај столове</button>
            <button onClick={handleNavigate}>Распоред</button>
        </div>
    );
};

export default HallBookingItem;




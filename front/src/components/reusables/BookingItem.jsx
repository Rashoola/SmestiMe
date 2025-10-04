import { useState } from "react";
import BookingDialog from "./BookingDialog";
import '../../style/BookingItem.css';
import hallSymbol from '../../images/hall_symbol.png';
import excursionSymbol from '../../images/excursion_symbol.png';

const BookingItem = ({ booking, onUpdateUnits, onDeleteBooking }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="booking-item">
      <div className='symbol-container'>
        {booking.location.locationType === "HALL" ? <img src={hallSymbol}></img> : <img src={excursionSymbol}></img>}
      </div>
      <div className="middle-part">
      <p>{booking.location.name}</p>
      <button type="button" onClick={() => setDialogOpen(true)}>
        Opremi
      </button>
      <button type="button" onClick={onDeleteBooking}>
        Ukloni rezervaciju
      </button>

      <BookingDialog
        isOpen={dialogOpen}
        booking={booking}
        organizationUnits={booking.organizationUnits || []}
        setOrganizationUnits={onUpdateUnits}
        onClose={() => setDialogOpen(false)}
      />
    </div>
    </div>
  );
};

export default BookingItem;







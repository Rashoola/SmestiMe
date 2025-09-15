import { useState } from "react";
import BookingDialog from "./BookingDialog";

const BookingItem = ({ booking, onUpdateUnits, onDeleteBooking }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="booking-item">
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
  );
};

export default BookingItem;







import React, { useEffect, useState } from "react";
import OrganizationUnitItem from "./OrganizationUnitItem";

const BookingItem = ({location}) => {
  const [organizationUnits, setOrganizationUnits] = useState([]);
  return (
    <div className="booking-item">
     <p>{location.name}</p>
     <button>Detalji</button>
    </div>
  );
};

export default BookingItem;






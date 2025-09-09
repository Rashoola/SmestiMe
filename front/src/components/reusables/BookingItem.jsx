import React, { useEffect, useState } from "react";
import OrganizationUnitItem from "./OrganizationUnitItem";

const BookingItem = ({ location, booking, onToggle, onUpdateUnits, unitTypes }) => {
  const [units, setUnits] = useState(booking?.organizationUnits || []);

  // sync when parent booking changes (add/remove or programmatic update)
  useEffect(() => {
    setUnits(booking?.organizationUnits || []);
  }, [booking]);

  const handleAddUnit = () => {
    const newUnit = { id: null, name: "", capacity: 0, unitType: "" };
    const updated = [...units, newUnit];
    setUnits(updated);
    onUpdateUnits(updated);
  };

  const handleUpdateUnit = (index, field, value) => {
    const updated = units.map((u, i) => (i === index ? { ...u, [field]: value } : u));
    setUnits(updated);
    onUpdateUnits(updated);
  };

  const handleRemoveUnit = (index) => {
    const updated = units.filter((_, i) => i !== index);
    setUnits(updated);
    onUpdateUnits(updated);
  };

  return (
    <div className="booking-item" style={{ border: "1px solid #ddd", padding: 10, marginBottom: 8 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" checked={!!booking} onChange={onToggle} />
        <strong>{location.name}</strong>
      </label>

      {booking && (
        <div className="organization-units" style={{ marginTop: 8 }}>
          <h4 style={{ margin: "8px 0" }}>Organizacione jedinice</h4>

          {units.length === 0 && <p style={{ fontStyle: "italic" }}>Nema jedinica — dodajte novu.</p>}

          {units.map((u, i) => (
            <OrganizationUnitItem
              key={i}
              unit={u}
              unitTypes={unitTypes}
              onChange={(field, value) => handleUpdateUnit(i, field, value)}
              onRemove={() => handleRemoveUnit(i)}
            />
          ))}

          <div style={{ marginTop: 8 }}>
            <button type="button" onClick={handleAddUnit}>
              ➕ Dodaj jedinicu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingItem;






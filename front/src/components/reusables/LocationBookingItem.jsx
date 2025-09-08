import React from 'react';

const LocationBookingItem = ({ location, isBooked, onToggle, onEnter }) => {
  return (
    <div className="location-item">
      <label>
        <input
          type="checkbox"
          checked={isBooked}
          onChange={() => onToggle(location.id)}
        />
        {location.name} ({location.locationType})
      </label>
      {isBooked && (
        <button type="button" onClick={() => onEnter(location.id)}>
          Enter
        </button>
      )}
    </div>
  );
};

export default LocationBookingItem;

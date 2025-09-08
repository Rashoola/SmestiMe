import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import LocationBookingItem from '../reusables/LocationBookingItem';

const EventDisplayPage = ({ mode }) => {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [venueId, setVenueId] = useState('');
  const [date, setDate] = useState('');
  const [entryCode, setEntryCode] = useState('');

  const [venues, setVenues] = useState([]);
  const [bookedLocations, setBookedLocations] = useState([]);

  const [error, setError] = useState('');

  // Fetch all venues
  const fetchVenues = async () => {
    try {
      const res = await fetch('http://localhost:9000/api/venues');
      if (res.ok) {
        const data = await res.json();
        setVenues(data);
      } else {
        setError('Neuspešno učitavanje mesta.');
      }
    } catch (err) {
      setError('Greška prilikom povezivanja.');
    }
  };

  // Fetch event if editing
  const fetchEvent = async () => {
    try {
      const res = await fetch(`http://localhost:9000/api/events/${id}`);
      if (res.ok) {
        const data = await res.json();
        setName(data.name);
        setVenueId(data.venue.id);
        setDate(data.date);
        setEntryCode(data.entryCode || '');
        setBookedLocations(data.bookedLocations?.map((loc) => loc.id) || []);
      } else {
        setError('Neuspešno učitavanje događaja.');
      }
    } catch (err) {
      setError('Greška prilikom povezivanja.');
    }
  };

  // Initial load
  useEffect(() => {
    fetchVenues();
    if (mode === 'edit') {
      fetchEvent();
    }
  }, [mode, id]);

  // Toggle booking of a location
  const toggleLocation = (locationId) => {
    setBookedLocations((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleEnterLocation = (locationId) => {
    alert(`Entering location ${locationId}`);
  };

  // Save event
  const handleSaveEvent = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      id: mode === 'edit' ? id : undefined,
      name,
      venueId,
      date,
      entryCode,
      bookedLocations, // list of location IDs
    };
    console.log(payload);
    try {
      const url =
        mode === 'create'
          ? 'http://localhost:9000/api/events/create'
          : 'http://localhost:9000/api/events/update';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Event saved:', data);
      } else {
        setError('Neuspešno čuvanje događaja.');
      }
    } catch (err) {
      setError('Greška prilikom povezivanja.');
    }
  };

  return (
    <>
      <Header title='FON Event Manager' buttons={[]}/>
      <div className="main">
        <AboutSection
          title="Stranica za prikaz događaja"
          description="Ovde možete editovati događaj"
        />
        <div className="main-content">
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <h2>Podaci o događaju</h2>
          <form onSubmit={handleSaveEvent}>
            <label htmlFor="name">Naziv:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="venue">Mesto:</label>
            <select
              name="venue"
              value={venueId}
              onChange={(e) => setVenueId(e.target.value)}
            >
              <option value="">-- Odaberite mesto --</option>
              {venues.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>

            <label htmlFor="date">Datum:</label>
            <input
              type="text"
              name="date"
              value={date || ''}
              onChange={(e) => setDate(e.target.value)}
            />

            <label htmlFor="entry-code">Kod za ulaz:</label>
            <input
              type="text"
              name="entry-code"
              value={entryCode}
              onChange={(e) => setEntryCode(e.target.value)}
            />

            {/* Locations from selected venue */}
            {venueId && (
              <div className="locations-section">
                <h3>Lokacije u mestu</h3>
                {venues
                  .find((v) => v.id === parseInt(venueId))
                  ?.locations.map((loc) => (
                    <LocationBookingItem
                      key={loc.id}
                      location={loc}
                      isBooked={bookedLocations.includes(loc.id)}
                      onToggle={toggleLocation}
                      onEnter={handleEnterLocation}
                    />
                  ))}
              </div>
            )}

            <button type="submit">Sačuvaj</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventDisplayPage;


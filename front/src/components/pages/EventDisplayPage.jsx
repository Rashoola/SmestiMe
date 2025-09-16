import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Header from "../reusables/Header";
import AboutSection from "../reusables/AboutSection";
import BookingItem from "../reusables/BookingItem";

const EventDisplayPage = ({ mode }) => {
  const { id } = useParams();
  const [venues, setVenues] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState(null);
  const [date, setDate] = useState('');
  const [entryCode, setEntryCode] = useState('');

  const [availableLocations, setAvailableLocations] = useState([]);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [bookedLocations, setBookedLocations] = useState([]); // 🔑 real source of truth

  useEffect(() => {
    if (mode === "edit") {
      fetchEvent();
    }
    fetchVenues();

  }, [mode, id]);

  useEffect(() => {
    if (date && venue) {
      fetchAvailableLocations();
    }
  }, [date, venue]);

  const fetchVenues = async () => {
    const url = 'http://localhost:9000/api/venues';
    try {
      let data = [];
      const response = await fetch(url);
      if (response.ok) {
        data = await response.json();
        setVenues(data);
      }
    } catch (err) {
      alert('Error during fetching venues');
    }
  }

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:9000/api/events/${id}`);
      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setDescription(data.description);
        setVenue(data.venue);
        setDate(data.date);
        setEntryCode(data.entryCode);
        setBookedLocations(data.bookedLocations || []);
      } else {
        alert("Error while fetching the event");
      }
    } catch (err) {
      alert("Error while connecting.");
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}.${month}.${year}`;
  };

  const fetchAvailableLocations = async () => {
    if (date !== "" && venue !== null) {
      const formattedDate = formatDate(date);
      const url = `http://localhost:9000/api/venues/${venue.id}/locations/available?date=${formattedDate}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setAvailableLocations(data);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // 🔑 Update bookedLocations directly
  const updateBookingUnits = (bookingId, newUnits) => {
    setBookedLocations((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, organizationUnits: newUnits } : b
      )
    );
  };

  const addBooking = (e) => {
    e.preventDefault(); // prevent form submission

    if (!selectedLocationId) {
      alert("Odaberite lokaciju");
      return;
    }

    // Check if this location is already booked
    const alreadyBooked = bookedLocations.some(
      (b) => b.location.id === Number(selectedLocationId)
    );
    if (alreadyBooked) {
      alert("Ova lokacija je već dodata.");
      return;
    }

    // Find the selected location object
    const location = availableLocations.find(
      (loc) => loc.id === Number(selectedLocationId)
    );
    if (!location) return;

    const newBooking = {
      id: null, // new booking
      location: location,
      organizationUnits: [],
    };

    setBookedLocations([...bookedLocations, newBooking]);
  };


  const removeBooking = (bookingId) => {
    setBookedLocations((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const handleSave = async () => {
    // Simplify bookedLocations
    const simplifiedBookings = bookedLocations.map(b => ({
      id: b.id,
      locationId: b.location.id,
      organizationUnits: b.organizationUnits
    }));

    const payload = {
      id: id,
      name: name,
      date: formatDate(date),
      description: description,
      entryCode: entryCode,
      venueId: venue.id,
      bookedLocations: simplifiedBookings
    };

    alert(JSON.stringify(payload)); // for debugging

    const url = 'http://localhost:9000/api/events/save';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), // <- remember to stringify!
      });

      if (response.ok) {
        alert('Dogadjaj je sacuvan uspesno.');
      } else {
        alert('Doslo je do greske prilikom cuvanja.');
      }
    } catch (err) {
      alert('Error during connection when updating event.');
    }
  };

  return (
    <div>
      <Header title="FON Event Manager" buttons={[]} />
      <div className="main">
        <AboutSection title="" description="" />
        <div className="main-content">
          <form>
            <label htmlFor="name">Naziv</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="venue">Mesto odrzavanja</label>
            <select
              name="venue"
              value={venue ? venue.id : ""}
              onChange={(e) => {
                const selected = venues.find(v => v.id === Number(e.target.value));
                setVenue(selected);
              }}
              disabled={mode === "edit"}
            >
              {mode !== "edit" && <option value="">--Odaberite mesto--</option>}
              {venues.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>

            <label htmlFor="description">Opis</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="date">Datum</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={mode === 'edit'}
            />

            <label htmlFor="entry-code">Sifra za ulaz</label>
            <input
              type="text"
              name="entry-code"
              value={entryCode}
              onChange={(e) => setEntryCode(e.target.value)}
            />

            <div className="booked-locations-input">
              <select onChange={(e) => setSelectedLocationId(e.target.value)} name="available-locations" id="">
                <option value="">--Odaberite lokaciju--</option>
                {availableLocations.map((loc, index) => (
                  <option key={index} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              <button onClick={addBooking}>Dodaj rezervaciju</button>
            </div>

            <div className="booked-locations">
              <ul className="locations-list">
                {bookedLocations.map((loc) => (
                  <li key={loc.id}>
                    <BookingItem
                      booking={loc}
                      onUpdateUnits={(units) => updateBookingUnits(loc.id, units)}
                      onDeleteBooking={() => removeBooking(loc.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </form>
          <button onClick={handleSave}>Sacuvaj</button>
        </div>
      </div>
    </div>
  );
};

export default EventDisplayPage;










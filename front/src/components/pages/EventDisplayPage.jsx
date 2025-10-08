import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from "../reusables/Header";
import AboutSection from "../reusables/AboutSection";
import BookingItem from "../reusables/BookingItem";
import '../../style/EventDisplayPage.css';

const EventDisplayPage = ({ mode }) => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const { id } = useParams();
  const navigate = useNavigate();

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
  const updateBookingUnits = (bookingLocationId, newUnits) => {
    alert('Updating units. Adding units: ' + newUnits + ' to booking: ' + bookingLocationId);
    setBookedLocations((prev) =>
      prev.map((b) =>
        b.location.id === bookingLocationId ? { ...b, organizationUnits: newUnits } : b
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

    alert(JSON.stringify(payload));
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
      <Header title="FON Event Manager" name={loggedUser.name + ' ' + loggedUser.surname} buttons={[]} />
      <div className="main">
        <AboutSection title="Stranica za kreiranje/uređivanje događaja" 
        description="Na ovoj stranici možete izvršiti pravljenje novog događaja kao i izmeniti 
        podatke o postojećem." />
        <div className="main-content">
          <div style={{width: '100%'}} className='central'>
            <h2>Podaci o dogadjaju:</h2>
          <form>
            <div className='basic-event-data'>
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
            </div>

            <div className="booked-locations-input">
              <div className='booked-locations-input-fields'>
              <p>Rezervisane lokacije:</p>
              <select onChange={(e) => setSelectedLocationId(e.target.value)} name="available-locations" id="">
                <option value="">--Odaberite lokaciju--</option>
                {availableLocations.map((loc, index) => (
                  <option key={index} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              <button onClick={addBooking}>Dodaj rezervaciju</button>
            </div>

            <div className="booked-locations">
              <ul className="booked-locations-list">
                {bookedLocations.map((loc, index) => (
                  <li key={index}>
                    <BookingItem 
                      key={index}
                      booking={loc}
                      onUpdateUnits={(units) => updateBookingUnits(loc.location.id, units)}
                      onDeleteBooking={() => removeBooking(loc.id)}
                    />
                  </li>
                ))}
              </ul>
               <button onClick={handleSave}>Sacuvaj</button>
            </div>
           
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDisplayPage;










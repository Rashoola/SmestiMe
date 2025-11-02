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
      } else {
        alert('Систем не може да учита места одржавања.');
      }
    } catch (err) {
      alert('Грешка приликом повезивања.');
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
        alert("Систем не може да учита догађај.");
      }
    } catch (err) {
      alert("Грешка приликом повезивања.");
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
      const url = `http://localhost:9000/api/locations/venue/${venue.id}/available?date=${formattedDate}`;
      try {
        const response = await fetch(url);
        if(!response.ok){
          alert('Систем не може да учита доступне локације.');
          return;
        }
        const data = await response.json();
        setAvailableLocations(data);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // 🔑 Update bookedLocations directly
  const updateBookingUnits = (bookingLocationId, newUnits) => {
    setBookedLocations((prev) =>
      prev.map((b) =>
        b.location.id === bookingLocationId ? { ...b, organizationUnits: newUnits } : b
      )
    );
  };

  const addBooking = (e) => {
    e.preventDefault(); // prevent form submission

    if (!selectedLocationId) {
      alert("Одаберите локацију.");
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

  const validateInput = () => {
    if (!name.trim() || !description.trim() || !date || !entryCode.trim() || !venue) {
      alert('Сва поља морају бити попуњена.');
      return false;
    }
    return true;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if(!validateInput()) return;

      if (!window.confirm(`Да ли сте сигурни да желите да сачувате догађај? Након што се догађај сачува, 
      промена датума и места одржавања неће бити могућа.`)) {
      return; // stop if user cancels
    }
    
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

    const url = 'http://localhost:9000/api/events/save';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), // <- remember to stringify!
      });

      if (response.ok) {
        alert('Систем је запамтио догађај.');
        navigate('/admin-dashboard', {replace: true});
      } else {
        alert('Систем не може да запамти догађај.');
      }
    } catch (err) {
      alert('Грешка приликом повезивања.');
    }
  };

  return (
    <div>
      <Header title="Подаци о догађају" name={loggedUser.name + ' ' + loggedUser.surname} buttons={[{title: 'Почетна', action: () => navigate('/admin-dashboard')}]} />
      <div className="main">
        <div className="main-content">
          <form className='event-form'>
            <div className='basic-event-data'>
            <label htmlFor="name">Назив</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="venue">Место одржавања</label>
            <select
              name="venue"
              value={venue ? venue.id : ""}
              onChange={(e) => {
                const selected = venues.find(v => v.id === Number(e.target.value));
                setVenue(selected);
              }}
              disabled={mode === "edit"}
            >
              {mode !== "edit" && <option value="">--Одаберите место--</option>}
              {venues.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>

            <label htmlFor="description">Опис</label>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="date">Датум одржавања</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={mode === 'edit'}
            />

            <label htmlFor="entry-code">Шифра за улаз</label>
            <input
              type="text"
              name="entry-code"
              value={entryCode}
              onChange={(e) => setEntryCode(e.target.value)}
            />
            </div>

            <div className="booked-locations-input">
              <div className='booked-locations-input-fields'>
              <p>Резервисане локације</p>
              <select style={{marginRight: 10}} onChange={(e) => setSelectedLocationId(e.target.value)} name="available-locations" id="">
                <option value="">--Одаберите локацију--</option>
                {availableLocations.map((loc, index) => (
                  <option key={index} value={loc.id}>{loc.name}</option>
                ))}
              </select>
              <button onClick={addBooking}>Додај резервацију</button>
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
               <button onClick={handleSave}>Сачувај податке</button>
               <button>Откажи</button>
            </div>
           
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventDisplayPage;










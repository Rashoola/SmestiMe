import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../reusables/Header";
import AboutSection from "../reusables/AboutSection";
import BookingItem from "../reusables/BookingItem";

const EventDisplayPage = ({ mode }) => {

  const { id } = useParams();

  

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState({ name: 'Not loaded yet..' });
  const [date, setDate] = useState('');
  const [entryCode, setEntryCode] = useState('');

  const [availableLocations, setAvailableLocations] = useState([]);
  const [bookedLocations, setBookedLocations] = useState([]);

useEffect(() => {
    if (mode === 'edit') {
      fetchEvent();
    }
  }, [mode, id]
  );

  useEffect(() => {
    fetchAvailableLocations();
  }, [date, venue]
  );

  const fetchEvent = async () => {
    try {
      console.log('The id is: ' + id);
      const response = await fetch(`http://localhost:9000/api/events/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
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
  }

  const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const [year, month, day] = isoDate.split("-");
  return `${day}.${month}.${year}`;
};

  const fetchAvailableLocations = async () => {
    if(date !== '' & venue !== null){
      const formattedDate = formatDate(date);
      const url = `http://localhost:9000/api/venues/${venue.id}/locations/available?date=${formattedDate}`;
      console.log(url);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setAvailableLocations(data);
    } catch(err) {
      alert(err.message);
    }
  }
  };

  return (
    <div>
      <Header title='FON Event Manager' buttons={[]} />
      <div className="main">
        <AboutSection title='' description='' />
        <div className="main-content">
          <form>
            <label htmlFor="name">Naziv</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="venue">Mesto odrzavanja</label>
            <select name="venue" id="" onChange={(e) => setVenue(e.target.value)} disabled>
              {mode === 'edit' ? (<option value={venue.id}>{venue.name}</option>) : <option></option>}
            </select>

            <label htmlFor="description">Opis</label>
            <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <label htmlFor="date">Datum</label>
            <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <label htmlFor="entry-code">Sifra za ulaz</label>
            <input type="text" name="entry-code" value={entryCode} onChange={(e) => setEntryCode(e.target.value)} />

            <div className="booked-locations">
              <div className="location-add">
                <select name="location" id="">
                  {availableLocations.map((loc, index) => (
                    <option key={index} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
                <button>Rezervisi lokaciju</button>
              </div>
              <ul className="locations-list">
                {bookedLocations.map((loc, index) => (
                  <li key={index}>
                    <BookingItem location={loc.location}></BookingItem>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventDisplayPage;










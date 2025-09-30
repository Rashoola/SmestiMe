import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import LocationItem from '../reusables/LocationItem';
import '../../style/VenueDisplayPage.css';

const VenueDisplayPage = ({ mode }) => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const { id } = useParams();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [locations, setLocations] = useState([]);

  const [locationName, setLocationName] = useState('');
  const [locationTypes, setLocationTypes] = useState([]);
  const [locationType, setLocationType] = useState('');

  // --- Fetch location types ---
  const fetchLocationTypes = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/venues/locations/types');
      if (!response.ok) throw new Error('Neuspešno učitavanje tipova frakcija.');
      const data = await response.json();
      setLocationTypes(data);
      if (data.length > 0) setLocationType(data[0]);
    } catch (err) {
      alert(err.message || 'Greška prilikom povezivanja.');
    }
  };

  // --- Fetch venue data if editing ---
  const fetchVenue = async () => {
    if (mode !== 'edit' || !id) return;
    try {
      const response = await fetch(`http://localhost:9000/api/venues/${id}`);
      if (!response.ok) throw new Error('Neuspešno učitavanje mesta.');
      const data = await response.json();
      setName(data.name || '');
      setAddress(data.address || '');
      setContact(data.contact || '');
      setLocations(data.locations || []);
    } catch (err) {
      alert(err.message || 'Greška prilikom povezivanja.');
    }
  };

  useEffect(() => {
    fetchVenue();
    fetchLocationTypes();
  }, [mode, id]);

  // --- Add / Remove location ---
  const handleAddLocation = (e) => {
    e.preventDefault();
    if (!locationName.trim()) {
      alert('Naziv frakcije je obavezan.');
      return;
    }
    setLocations([...locations, { name: locationName, locationType }]);
    setLocationName('');
    setLocationType(locationTypes.length > 0 ? locationTypes[0] : '');
  };

  const handleRemoveLocation = (indexToRemove) => {
    setLocations(locations.filter((_, index) => index !== indexToRemove));
  };

  // --- Save venue (create or update) ---
  const handleSaveVenue = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !address.trim() || !contact.trim()) {
      alert('Naziv, adresa i kontakt su obavezni.');
      return;
    }
    if (locations.length === 0) {
      alert('Morate dodati bar jednu frakciju.');
      return;
    }

    const payload = { name, address, contact, locations };

    try {
      const url =
        mode === 'create'
          ? 'http://localhost:9000/api/venues/create'
          : `http://localhost:9000/api/venues/update`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'edit' ? { id, ...payload } : payload),
      });

      if (!response.ok) throw new Error('Neuspešno čuvanje mesta.');
      const data = await response.json();
      console.log('Venue saved:', data);

      if (mode === 'edit') {
        fetchVenue(); // refresh after update
      } else {
        setName('');
        setAddress('');
        setContact('');
        setLocations([]);
      }
      alert('Podaci o mestu su sačuvani.');
    } catch (err) {
      alert(err.message || 'Greška prilikom povezivanja.');
    }
  };

  return (
    <>
      <Header title="FON Event Manager" name={loggedUser.name + ' ' + loggedUser.surname} buttons={[]} />
      <div className="main">
        <AboutSection
          title= 'Stranica za kreiranje/izmenu podataka o mestu održavanja'
          description= 'Na ovoj stranici možete uneti novo mesto održavanja u sistem, kao i izmeniti podatke o postojećem.'
        />

        <div className="main-content">
          <div className='central' style={{width: '100%'}}>
          <h2>Podaci o mestu održavanja:</h2>
          <form className='venue-form' onSubmit={handleSaveVenue}>
            <div className='basic-venue-data'>
            <label htmlFor="name">Naziv:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="address">Adresa:</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label htmlFor="contact">Kontakt:</label>
            <input
              type="text"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              style={{marginBottom: '10px'}}
            />
            </div>

            <div className='location-input'>
              <div className='location-input-fields'>
            <label htmlFor="location-name">Unesi naziv frakcije:</label>
            <input
              type="text"
              name="location-name"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />

            <label htmlFor="location-type">Unesi tip frakcije:</label>
            <select
              name="location-type"
              value={locationType}
              onChange={(e) => setLocationType(e.target.value)}
            >
              {locationTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <button onClick={handleAddLocation}>Dodaj frakciju</button>
            </div>
            <ul className='locations-list'>
              {locations.map((location, index) => (
                <li key={index}>
                  <LocationItem
                    location={location}
                    onRemove={() => handleRemoveLocation(index)}
                  />
                </li>
              ))}
            </ul>
            <button type="submit">Sačuvaj</button>
            </div>

            
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenueDisplayPage;


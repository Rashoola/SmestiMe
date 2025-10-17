import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  // --- Fetch location types ---
  const fetchLocationTypes = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/venues/locations/types');
      if (!response.ok) throw new Error('Систем не може да учита типове локација.');
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
      if (!response.ok) throw new Error('Систем не може да учита место одржавања.');
      const data = await response.json();
      setName(data.name || '');
      setAddress(data.address || '');
      setContact(data.contact || '');
      setLocations(data.locations || []);
    } catch (err) {
      alert(err.message || 'Грешка приликом повезивања.');
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
      alert('Назив локације је обавезан.');
      return;
    }
    setLocations([...locations, { name: locationName, locationType }]);
    setLocationName('');
    setLocationType(locationTypes.length > 0 ? locationTypes[0] : '');
  };

  const handleRemoveLocation = (indexToRemove) => {
    setLocations(locations.filter((_, index) => index !== indexToRemove));
  };

  const getLocationTypeTranslation = (value) => {
    switch(value){
      case 'HALL': return 'Сала';
      case 'EXCURSION': return 'Превоз';
    }
  }

  // --- Save venue (create or update) ---
  const handleSaveVenue = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !address.trim() || !contact.trim()) {
      alert('Назив, адреса и контакт су обавезни.');
      return;
    }
    if (locations.length === 0) {
      alert('Морате додати бар једну локацију.');
      return;
    }

    const payload = { name, address, contact, locations };

    try {
      const url = 'http://localhost:9000/api/venues/save';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'edit' ? { id, ...payload } : payload),
      });

      if (!response.ok) throw new Error('Систем не може да сачува место одржавања.');
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
      alert('Систем је запамтио место одржавања.');
      navigate('/admin-dashboard', {replace: true});
    } catch (err) {
      alert(err.message || 'Грешка приликом повезивања');
    }
  };

  return (
    <>
      <Header title="подаци о месту" name={loggedUser.name + ' ' + loggedUser.surname} buttons={[]} />
      <div className="main">
        <AboutSection
          title= 'Страница за унос и измену података о месту одржавања'
          description= 'На овој страници можете унети податке о новом месту одржавања, као и изменити податке о већ постојећем месту у систему.'
        />

        <div className="main-content">
          <div className='central' style={{width: '100%'}}>
          <h2>Подаци о месту</h2>
          <form className='venue-form' onSubmit={handleSaveVenue}>
            <div className='basic-venue-data'>
            <label htmlFor="name">Назив</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="address">Адреса</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <label htmlFor="contact">Контакт</label>
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
            <label htmlFor="location-name">Унесите назив локације</label>
            <input
              type="text"
              name="location-name"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
            />

            <label htmlFor="location-type">Унесите врсту локације</label>
            <select
              name="location-type"
              value={locationType}
              onChange={(e) => setLocationType(e.target.value)}
            >
              {locationTypes.map((type, idx) => (
                <option key={idx} value={type}>
                  {getLocationTypeTranslation(type)}
                </option>
              ))}
            </select>

            <button onClick={handleAddLocation}>Додај локацију</button>
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
            <button type="submit">Сачувај податке</button>
            <button>Откажи</button>
            </div>  
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenueDisplayPage;


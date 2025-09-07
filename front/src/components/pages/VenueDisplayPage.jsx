import React, { useState, useEffect } from 'react';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import { useParams } from 'react-router-dom';
import LocationItem from '../reusables/LocationItem';

const VenueDisplayPage = () => {
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [locations, setLocations] = useState([]);

  const [locationName, setLocationName] = useState('');
  const [locationTypes, setLocationTypes] = useState([]);
  const [locationType, setLocationType] = useState('');

  const [error, setError] = useState('');

  const fetchLocationTypes = async () => {
    try {
      const response = await fetch('http://localhost:9000/api/venues/locations/types');
      if (response.ok) {
        const data = await response.json(); // ["HALL", "EXCURSION", ...]
        setLocationTypes(data);
        if (data.length > 0) {
          setLocationType(data[0]); // default: first type
        }
      } else {
        setError('Neuspešno učitavanje tipova frakcija.');
      }
    } catch (err) {
      setError('Greška prilikom povezivanja.');
    }
  };

  const fetchVenue = async () => {
    try {
      const response = await fetch(`http://localhost:9000/api/venues/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setVenue(data);
        setName(data.name);
        setAddress(data.address);
        setContact(data.contact);
        setLocations(data.locations || []);
      } else {
        setError('Neuspešno učitavanje mesta.');
      }
    } catch (err) {
      setError('Greška prilikom povezivanja.');
    }
  };

  useEffect(() => {
    fetchVenue();
    fetchLocationTypes();
  }, []);

  const handleAddLocation = (e) => {
    e.preventDefault();
    setLocations([...locations, { name: locationName, locationType }]);
    setLocationName('');
    setLocationType(locationTypes.length > 0 ? locationTypes[0] : '');
  };

  const headerButtons = [];

  return (
    <>
      <Header title="FON Event Manager" name="" buttons={headerButtons} />
      <div className="main">
        <AboutSection 
        title='Stranica za prikaz podataka o mestu' 
        description='Na ovoj stranici mozete videti kao i promeniti 
        podatke o mestu koje je prikazano.'
        />
        <div className="main-content">
          <h2>Podaci o mestu</h2>
          <form>
            <label htmlFor="name">Naziv:</label>
            <input type="text" name="name" value={name} readOnly />

            <label htmlFor="address">Adresa:</label>
            <input type="text" name="address" value={address} readOnly />

            <label htmlFor="contact">Kontakt:</label>
            <input type="text" name="contact" value={contact} readOnly />

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

            <ul>
              {locations.map((location, index) => (
                <li key={index}>
                  <LocationItem location={location} />
                </li>
              ))}
            </ul>

            <button>Sacuvaj</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VenueDisplayPage;

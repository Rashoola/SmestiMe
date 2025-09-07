import React from 'react';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import {useState} from 'react';

const VenueDisplayPage = ({venue}) => {
    const [name, setName] = useState(venue.name);
    const [address, setAddress] = useState(venue.address);
    const [contact, setContact] = useState(venue.contact);
    const [locations, setLocations] = useState(venue.locations);

  return (
    <>
    <Header title='FON Event Manager' name=''/>
    <div className='main'>
        <AboutSection/>
        <div className='main-content'>
            <h2>Podaci o mestu</h2>
            <form>
                <input type="text" name='name' value={name}/>
                <input type="text" name='address' value={address}/>
                <input type="text" name='contact' value={contact}/>

                <input type="text" name='location-name'/>
                <select name="location-type" id=""></select>
                <button>Dodaj frakciju</button>
                <ul>
                    
                </ul>
            </form>
        </div>
    </div>
    </>
  );
};

export default VenueDisplayPage;
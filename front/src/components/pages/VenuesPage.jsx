import React from 'react';
import {useState, useEffect} from 'react';
import VenueItem from '../reusables/VenueItem';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import {useNavigate} from 'react-router-dom';

const VenuesPage = () => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const navigate = useNavigate();
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        const fetchVenues = async () => {
          try {
            const response = await fetch('http://localhost:9000/api/venues'); // adjust URL
            if (!response.ok) {
              throw new Error('Failed to fetch venues');
            }
            const data = await response.json();
            setVenues(data);
          } catch (error) {
            console.error('Error fetching venues:', error);
          }
        };
    
        fetchVenues();
      }, []);

      const headerButtons = [
    { title: "Napravi mesto", action: ()=>navigate('/venue/create') },
  ]

  return (
    <>
      <Header title='FON Event Manager' name={loggedUser.name + ' ' + loggedUser.surname} buttons={headerButtons}/>
      <div className='main'>
        <AboutSection
          title='Prikaz svih mesta' 
          description='Na ovoj stranici možete videti sva mesta koja 
          se trenutno nalaze u sistemu, kao i pregledati ili promeniti 
          njihove podatke.'
        />
        <div className='main-content'>
          <h2>Lista mesta održavanja dostupnih u sistemu:</h2>
          <ul style={{padding: 0}}>
            {venues.map((venue) => (
              <VenueItem key={venue.id} venue={venue} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default VenuesPage;
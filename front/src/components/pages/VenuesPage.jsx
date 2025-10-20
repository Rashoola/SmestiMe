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
    {title: 'Почетна', action: () => navigate('/admin-dashboard')}
  ]

  return (
    <>
      <Header title='места одржавања' name={loggedUser.name + ' ' + loggedUser.surname} buttons={headerButtons}/>
      <div className='main'>
        <div className='main-content' style={{overflowY: 'scroll'}}>
          <div style={{width: '100%'}} className='central'>
          <h2 style={{marginLeft: 0}}>Места одржавања догађаја</h2>
          <ul style={{padding: 0}}>
            {venues.map((venue) => (
              <VenueItem key={venue.id} venue={venue} />
            ))}
          </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenuesPage;
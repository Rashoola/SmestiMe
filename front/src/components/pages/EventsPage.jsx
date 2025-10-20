import React, { useState, useEffect } from 'react';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import EventItem from '../reusables/EventItem'; // adjust path if needed
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/events'); // adjust URL
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const headerButtons = [
    { title: "Направи нови догађај", action: ()=>navigate('/event/create') },
    {title: 'Почетна', action: () => navigate('/admin-dashboard')}
  ];

  return (
    <>
      <Header title='приказ предстојећих догађаја' name={loggedUser.name + ' ' + loggedUser.surname} buttons={headerButtons}/>
      <div className='main'>
        <div className='main-content' style={{overflowY: 'scroll'}}>
           <div style={{width: '100%'}} className='central'>
          <ul style={{padding: 0}}>
            {events.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsPage;

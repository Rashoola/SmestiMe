import React, { useState, useEffect } from 'react';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import EventItem from '../reusables/EventItem'; // adjust path if needed
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
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
    { title: "Napravi dogadjaj", action: ()=>navigate('/event/create') },
  ];

  return (
    <>
      <Header title='FON Event Manager' name='' buttons={headerButtons}/>
      <div className='main'>
        <AboutSection
          title='Prikaz svih događaja' 
          description='Na ovoj stranici možete videti sve događaje koji 
          se trenutno nalaze u sistemu, kao i pregledati ili promeniti 
          njihove podatke.'
        />
        <div className='main-content'>
          <h2>Lista dostupnih događaja u sistemu</h2>
          <ul>
            {events.map((event) => (
              <EventItem key={event.id} event={event} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EventsPage;

import React, { useState, useEffect } from 'react';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import BookingDisplayItem from '../reusables/BookingDisplayItem';
import { useParams, useNavigate } from 'react-router-dom';
import WaitingParticipantItem from '../reusables/WaitingParticipantItem';
import '../../style/EventParticipantsDistributionPage.css';

const EventParticipantsDistributionPage = () => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const [event, setEvent] = useState(null);
  const [waitingParticipants, setWaitingParticipants] = useState([]);
  const [draggedParticipant, setDraggedParticipant] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchEvent();
    fetchWaitingParticipants();
  }, [id]);

  const fetchEvent = async () => {
    const url = `http://localhost:9000/api/events/${id}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
      } else {
        alert('Bad response from the server.');
      }
    } catch (err) {
      alert('Error while connecting to the server.');
    }
  };

  const fetchWaitingParticipants = async () => {
    const url = `http://localhost:9000/api/participations/event/${id}/waiting`;
    try{
        const response = await fetch(url);
        if(response.ok){
            const data = await response.json();
            setWaitingParticipants(data);
        }else{
            alert('Bad response from the server.');
        }
    }catch(err){
        alert('Error during connection to the server.');
    }
  };

  const handleDragParticipant = ({participant}) => {
    setDraggedParticipant(participant);
  }

  return (
    <>
      <Header title="распоређивање учесника" name={loggedUser.name + ' ' + loggedUser.surname} buttons={[{title: 'Почетна', action: () => navigate('/admin-dashboard')}]} />
      <div className="main">
        <AboutSection title="Страница за распоређивање учесника" 
        description="На овој страници можете видети преглед свих организационих јединица које су ангажоване 
        за дати догађај. У листи са десне стране налазе се сви учесници догађаја који тренутно 
        чеаку да буду распоређени на своју јединицу. Притиском и превлачењем учесника на жељену 
        јединицу можете извршити распоређивање." />
        <div className="main-content">
          <div className="distribution">
            {event ? (
              <ul>
                {event.bookedLocations.map((booking, index) => (
                  <li key={index}>
                    <BookingDisplayItem booking={booking} draggedParticipant={draggedParticipant}/>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading event data...</p>
            )}
          </div>
          <div className="waiting-participants">
            <strong>Учесници који чекају да буду распоређени</strong>
            {waitingParticipants.length > 0 ? (
              <ul>
                {waitingParticipants.map((participation, index) => (
                  <li key={index}>
                    <WaitingParticipantItem participation={participation} onDrag={handleDragParticipant}></WaitingParticipantItem>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Тренутно нема чекајућих учесника.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventParticipantsDistributionPage;

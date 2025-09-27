import React, { useState, useEffect } from 'react';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import BookingDisplayItem from '../reusables/BookingDisplayItem';
import { useParams } from 'react-router-dom';
import WaitingParticipantItem from '../reusables/WaitingParticipantItem';

const EventParticipantsDistributionPage = () => {
  const [event, setEvent] = useState(null);
  const [waitingParticipants, setWaitingParticipants] = useState([]);
  const [draggedParticipant, setDraggedParticipant] = useState(null);
  const { id } = useParams();

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
      <Header title="FON Event Manager" buttons={[]} />
      <div className="main">
        <AboutSection title="" description="" />
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
            {waitingParticipants ? (
              <ul>
                {waitingParticipants.map((participation, index) => (
                  <li key={index}>
                    <WaitingParticipantItem participation={participation} onDrag={handleDragParticipant}></WaitingParticipantItem>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Loading event data...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventParticipantsDistributionPage;

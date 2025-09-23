import React from 'react';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ParticipationBookingItem from '../reusables/ParticipationBookingItem';

const ParticipationBookingsPage = () => {

    const [participation, setParticipation] = useState(null);
      const { id } = useParams();

      useEffect(
        () => {
            fetchParticipation();
        }, []
      );

    const fetchParticipation = async () => {
        const url = `http://localhost:9000/api/participations/${id}`;
        try {
            const response = await fetch(url);
            if(response.ok){
                const data = await response.json();
                setParticipation(data);
            } else {
                alert('Participation fetch response was not good.')
            }
        } catch (err) {
            alert('Error during connecting to the server.')
        }
    };

    return (
        <>
            <Header title='FON Event Manager' buttons={[]}></Header>
            <div className='main'>
                <AboutSection title='Stranica za prikaz izbora lokacija' description=''></AboutSection>
                <div className='main-content'>
                    <h1>Rezervisane lokacije u okviru izabranog dogadjaja</h1>
                    <ul>
                        {participation.event.bookedLocations.map(
                            (booking, index) => (
                                <li key={index}>
                                    <ParticipationBookingItem booking={booking}></ParticipationBookingItem>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ParticipationBookingsPage;
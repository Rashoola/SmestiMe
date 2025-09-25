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
        }, [id]
      );

    const fetchParticipation = async () => {
        alert('participationId = ' + id);
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
                        {participation ? (participation.event.bookedLocations.map(
                            (booking, index) => (
                                <li key={index}>
                                    <ParticipationBookingItem booking={booking} participation={participation}></ParticipationBookingItem>
                                </li>
                            )
                        )) : <p>Ucitavam rezervacije...</p>}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ParticipationBookingsPage;
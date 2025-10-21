import React from 'react';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import ParticipationBookingItem from '../reusables/ParticipationBookingItem';
import '../../style/ParticipationBookingsPage.css';

const ParticipationBookingsPage = () => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const [participation, setParticipation] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();

      useEffect(
        () => {
            fetchParticipation();
        }, [id]
      );

    const fetchParticipation = async () => {
        const url = `http://localhost:9000/api/participations/${id}`;
        try {
            const response = await fetch(url);
            if(response.ok){
                const data = await response.json();
                setParticipation(data);
            } else {
                alert('Систем не може да учита учешће.')
            }
        } catch (err) {
            alert('Грешка приликом повезивања.')
        }
    };

    return (
        <>
            <Header title={'Одабир места у оквиру догађаја'} name={loggedUser.name + ' ' + loggedUser.surname} buttons={[{title: 'Почетна', action: () => navigate('/dashboard')}]}></Header>
            <div className='main'>
                <div className='main-content'>
                    <div style={{width: '100%'}} className='central'>
                    <h1 style={{marginLeft: 10, color: 'white'}}>Резервисане локације у оквиру изабраног догађаја</h1>
                    <ul className='participation-booking-list'>
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
            </div>
        </>
    );
};

export default ParticipationBookingsPage;
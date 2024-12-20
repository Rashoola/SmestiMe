import React from 'react';
import Header from './Header';
import ParticipantEventItem from './ParticipantEventItem';
import ParticipantEventList from './ParticipantEventList';
import {useLocation, useNavigate} from 'react-router-dom';
import '../style/ParticipantDashboard.css';
import MyEventsPage from './MyEventsPage';

const ParticipantDashboard = () => {

    const location = useLocation();
    const participant = location.state?.participant;

    const navigate = useNavigate();

    const handleMyEventsClick = () => {
        console.log(participant);
        navigate('/my-events', {state: {participant}});
    }

    return (
        <>
        <Header title="СместиМе! - Главна"></Header>
        <h1>Добродошли, {participant.name}</h1>
        <p>На овој страници имате преглед свих догађаја на које се можете пријавити.</p>
        <button onClick={handleMyEventsClick}>Моји догађаји</button>
        <div className='participant-dashboard'>
            <ParticipantEventList participant={participant}/>
        </div>
        
        </>
    );
};

export default ParticipantDashboard;
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
        <Header title="СместиМе!"></Header>
        <h1>Welcome, {participant.name}</h1>
        <div className='participant-dashboard'>
            <ParticipantEventList participant={participant}/>
        </div>
        <button onClick={handleMyEventsClick}>My events</button>
        </>
    );
};

export default ParticipantDashboard;
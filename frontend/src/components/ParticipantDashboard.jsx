import React from 'react';
import Header from './Header';
import ParticipantEventItem from './ParticipantEventItem';
import ParticipantEventList from './ParticipantEventList';
import {useLocation} from 'react-router-dom';
import '../style/ParticipantDashboard.css';

const ParticipantDashboard = () => {

    const location = useLocation();
    const participant = location.state?.participant;

    return (
        <>
        <Header title="СместиМе!"></Header>
        <h1>Welcome, {participant.name}</h1>
        <div className='participant-dashboard'>
            <ParticipantEventList participant={participant}/>
        </div>
        
        </>
    );
};

export default ParticipantDashboard;
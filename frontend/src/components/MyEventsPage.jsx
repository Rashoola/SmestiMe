import React from 'react';
import {useLocation} from 'react-router-dom';
import MyEventsList from './MyEventsList';

const MyEventsPage = () => {

    const location = useLocation();
    const participant = location.state?.participant;

    return(
        <div className='my-events'>
            <MyEventsList participant={participant} ></MyEventsList>
        </div>
    );
};

export default MyEventsPage;
import React from 'react';
import {useLocation} from 'react-router-dom';
import Header from './Header';
import ChooseHallList from './ChooseHallList';
import '../style/ChooseTablePage.css';

const ChooseTablePage = () => {
    const location = useLocation();
    const event = location.state?.event;
    const participant = location.state?.participant;

    return(
        <>
        <Header title='SmestiMe!'></Header>
        
        <div className='choose-table'>
            <h1>{event.event.name}</h1>
            <ChooseHallList event={event} participant={participant}></ChooseHallList>
        </div>
        </>
    );
};

export default ChooseTablePage;
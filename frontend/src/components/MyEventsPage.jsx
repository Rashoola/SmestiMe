import React from 'react';
import {useLocation} from 'react-router-dom';
import MyEventsList from './MyEventsList';
import Header from './Header';
import '../style/MyEventsPage.css';

const MyEventsPage = () => {

    const location = useLocation();
    const participant = location.state?.participant;

    return(
        <>
        <Header title={"СместиМе! - Моји догађаји"}></Header>
        <h1>Догађаји на које сам пријављен/а</h1>
        <p>На овој страници можете видети све догађаје на које сте тренутно пријављени.
            Након што одаберете догађај, можете изабрати и сто за којим желите да будете.
        </p>
        <div className='my-events'>
            <MyEventsList participant={participant} ></MyEventsList>
        </div>
        </>
    );
};

export default MyEventsPage;
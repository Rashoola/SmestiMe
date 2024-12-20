import React from 'react';
import {useLocation} from 'react-router-dom';
import Header from './Header';
import ChooseHallList from './ChooseHallList';
import '../style/ChooseTablePage.css';

const ChooseTablePage = () => {
    const location = useLocation();
    const participation = location.state?.participation;

    return(
        <>
        <Header title='СместиМе! - Бирање стола'></Header>
        <h1>Бирање стола</h1>
        <p>На овој страници можете извршити бирање стола за којим бисте желели да седите на догађају.</p>
        <div className='choose-table'>
            <h1>Догађај: {participation.event.name}</h1>
            <ChooseHallList participation={participation}></ChooseHallList>
        </div>
        </>
    );
};

export default ChooseTablePage;
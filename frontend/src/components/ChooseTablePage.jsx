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
        <Header title='SmestiMe!'></Header>
        
        <div className='choose-table'>
            <h1>{participation.event.name}</h1>
            <ChooseHallList participation={participation}></ChooseHallList>
        </div>
        </>
    );
};

export default ChooseTablePage;
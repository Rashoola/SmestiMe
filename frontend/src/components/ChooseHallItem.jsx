import React from 'react';
import ChooseTableList from './ChooseTableList';

const ChooseHallItem = ({booking, participation}) => {
    return(
        <div className='choose-hall-item'>
            <h2>Сала: {booking.hall.name}</h2>
            <ChooseTableList booking={booking} participation={participation}></ChooseTableList>
        </div>
    );
};

export default ChooseHallItem;
import React from 'react';
import ChooseTableList from './ChooseTableList';

const ChooseHallItem = ({booking, participant}) => {
    return(
        <div className='choose-hall-item'>
            <h2>{booking.hall.name}</h2>
            <ChooseTableList booking={booking} participant={participant}></ChooseTableList>
        </div>
    );
};

export default ChooseHallItem;
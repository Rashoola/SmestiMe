import React from 'react';
import {useNavigate} from 'react-router-dom';

const MyEventItem = ({participation}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        
        navigate('/choose-table', {state: {participation}});
    }

    return(
        <div className='my-event-item'>
            <h2>{participation.event.name}</h2>
            <button onClick={handleClick}>Изаберите сто</button>
        </div>
    );
};

export default MyEventItem;
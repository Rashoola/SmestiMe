import React from 'react';
import {useNavigate} from 'react-router-dom';

const MyEventItem = ({participant, event}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        console.log("MyEventItem: " + participant);
        navigate('/choose-table', {state: {event, participant}});
    }

    return(
        <div className='my-event-item'>
            <h2>{event.event.name}</h2>
            <button onClick={handleClick}>Изаберите сто</button>
        </div>
    );
};

export default MyEventItem;
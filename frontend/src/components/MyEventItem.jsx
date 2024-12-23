import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const MyEventItem = ({participation}) => {

    const navigate = useNavigate();

    const [hasASeat, setHasASeat] = useState(false);

    useEffect(() => {
        checkIfHasASeat();
    }, []);

    const checkIfHasASeat = async () => {
        const response = await fetch(`http://localhost:9000/api/participations/${participation.id}/has-a-seat`);
        if(response.ok){
            const data = await response.json();
            setHasASeat(data);
        } else {
            alert('Грешка приликом добијања информације о изабраним столовима.');
        }
    };

    const handleClick = () => {
        
        navigate('/choose-table', {state: {participation}});
    }

    return(
        <div className='my-event-item'>
            <h2>{participation.event.name}</h2>
            <button className={hasASeat ? 'seated' : ''} onClick={handleClick} disabled={hasASeat}>{hasASeat? 'Изабрали сте сто' : 'Изаберите сто'}</button>
            <p>{hasASeat? 'Сто је изабран.' : ''}</p>
        </div>
    );
};

export default MyEventItem;
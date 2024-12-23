import React, {useState, useEffect} from 'react';
import MyEventItem from './MyEventItem';

const MyEventsList = ({participant}) => {

    const [myParticipations, setMyParticipations] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMyEvents();
      }, []);

    const fetchMyEvents = async () => {
        console.log("MyEventsList: " + participant);
        try {
            const response = await fetch(`http://localhost:9000/api/participations/user/${participant.id}`);
            if (!response.ok) {
              alert("Учитавање листе догађаја није успело.");
              return;
            }
            const data = await response.json();
            console.log(data)
            setMyParticipations(data);
          } catch (err) {
            setError(err.message);
          }
    }
    return(
        <div className='my-events-list'>
            {error && <p className="error-message">{error}</p>}
      {myParticipations.length === 0 ? (
        <p>Тренутно нема догађаја за приказ.</p>
      ) : (
        myParticipations.map((participation) => <MyEventItem key={participation.id} participation={participation}/>)
      )}
        </div>
    );
};

export default MyEventsList;
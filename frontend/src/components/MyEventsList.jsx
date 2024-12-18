import React, {useState, useEffect} from 'react';
import MyEventItem from './MyEventItem';

const MyEventsList = ({participant}) => {

    const [myEvents, setMyEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMyEvents();
      }, []);

    const fetchMyEvents = async () => {
        console.log("MyEventsList: " + participant);
        try {
            const response = await fetch(`http://localhost:9000/api/participations/user/${participant.id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch participations.');
            }
            const data = await response.json();
            console.log(data)
            setMyEvents(data);
          } catch (err) {
            setError(err.message);
          }
    }
    return(
        <div className='my-events-list'>
            {error && <p className="error-message">{error}</p>}
      {myEvents.length === 0 ? (
        <p>Тренутно нема догађаја за приказ.</p>
      ) : (
        myEvents.map((event) => <MyEventItem key={event.id} event={event} participant={participant} />)
      )}
        </div>
    );
};

export default MyEventsList;
import React, {useState, useEffect} from 'react';
import ChooseHallItem from './ChooseHallItem';

const ChooseHallList = ({event, participant}) => {

    const [bookedHalls, setBookedHalls] = useState([]);

    useEffect(() => {
        fetchBookedHalls();
    }, []);
    
    const fetchBookedHalls = async () => {
        console.log("ChooseHallList: " + participant);
        const response = await fetch(`http://localhost:9000/api/events/${event.id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch booked halls.');
          }
          const data = await response.json();
          console.log(data)
          setBookedHalls(data.bookedHalls);
    }

    return(
        <div className='choose-hall-list'>
           
      {bookedHalls.length === 0 ? (
        <p>Nema sala za prikaz.</p>
      ) : (
        bookedHalls.map((booking) => <ChooseHallItem key={booking.id} booking={booking} participant={participant} />)
      )}
        </div>
    );
};

export default ChooseHallList;
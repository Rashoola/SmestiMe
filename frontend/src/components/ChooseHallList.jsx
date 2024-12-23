import React, {useState, useEffect} from 'react';
import ChooseHallItem from './ChooseHallItem';

const ChooseHallList = ({participation}) => {

    const [bookedHalls, setBookedHalls] = useState([]);

    useEffect(() => {
        fetchBookedHalls();
    }, []);
    
    const fetchBookedHalls = async () => {
        const response = await fetch(`http://localhost:9000/api/events/${participation.event.id}`);
        if (!response.ok) {
            alert("Учитавање резервисаних сала није успело.");
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
        bookedHalls.map((booking) => <ChooseHallItem key={booking.id} booking={booking} participation = {participation} />)
      )}
        </div>
    );
};

export default ChooseHallList;
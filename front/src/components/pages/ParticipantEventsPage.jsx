import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';

const ParticipantEventsPage = () => {
    const userId = useParams();
    const [participations, setParticipations] = useState([]);

    useEffect(
        () => {
            fetchParticipations();
        }
    );

    const fetchParticipations = async () => {
        const url = `http://localhost:9000/api/participations/user/${userId}`;
        try{
            const response = await fetch(url);
            let data = null;
            if(response.ok){
                data = await response.json();
                setParticipations(data);
            }else{
                alert('Response from the server was not ok.');
            }
        }catch(err){
            alert('Error during participations fetching.')
        }
    };

  return (
    <>
    <Header title='FON Event Manager' buttons={[]}></Header>
    <div className='main'>
      <AboutSection title='Stranica sa dogadjajima korisnika' description=''></AboutSection>
      <div className='main-content'>
        <label htmlFor="entry-code">Kod za ulaz: </label>
        <input type="entry-code" />
        <button type='button'>Pridruzi se dogadjaju</button>

        <div className='participant-event-list'>

        </div>
      </div>
    </div>
    </>
  );
};

export default ParticipantEventsPage;
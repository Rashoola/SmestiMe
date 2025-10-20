import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import ParticipationItem from '../reusables/ParticipationItem';
import '../../style/ParticipantEventsPage.css';

const ParticipantEventsPage = () => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const { id } = useParams(); // destructure to get the actual param

  const [participations, setParticipations] = useState([]);
  const [entryCode, setEntryCode] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchParticipations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // add dependency array so it doesn't refetch endlessly

  const handleParticipate = async () => {
    const payload = {
      userId: id,
      entryCode: entryCode
    };
    const url = 'http://localhost:9000/api/participations/create';
    try{
      const response = await fetch(url, 
        {
          method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
        }
      );

      if(response.ok){
        alert('Успешна пријава на догађај.');
        fetchParticipations();
      } else {
        alert('Неуспешна пријава на догађај.')
      }
    }catch(err){
      alert('Грешка приликом повезивања.')
    }
  };

  const fetchParticipations = async () => {
    const url = `http://localhost:9000/api/participations/user/${id}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setParticipations(data);
      } else {
        alert('Систем не може да учита учешћа.');
      }
    } catch (err) {
      alert('Грешка приликом повезивања.');
    }
  };

  return (
    <>
      <Header title="догађаји на које сте пријављени" name={loggedUser.name + ' ' + loggedUser.surname} buttons={[{title: 'Почетна', action: () => navigate('/dashboard')}]} />
      <div className="main">
        <div className='join-form'>
          <label htmlFor="entry-code">Шифра за улаз </label>
          <input style={{marginRight: 10}} onChange={(e) => setEntryCode(e.target.value)} id="entry-code" type="text" />
          <button onClick={() => handleParticipate()} type="button">Придружи се догађају</button>
          </div>
        <div className="main-content">
          
          <div style={{width: '100%'}} className='central'>
            
          <div className="participant-event-list">
            {participations.length === 0 ? (
              <p>Нема догађаја за приказ.</p>
            ) : (
              <ul>
                {participations.map((participation, index) => (
                  <li key={index} value={participation.id}>
                    <ParticipationItem participation={participation} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantEventsPage;

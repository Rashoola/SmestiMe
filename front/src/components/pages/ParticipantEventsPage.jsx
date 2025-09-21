import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../reusables/Header';
import AboutSection from '../reusables/AboutSection';
import ParticipationItem from '../reusables/ParticipationItem';

const ParticipantEventsPage = () => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  const { id } = useParams(); // destructure to get the actual param

  const [participations, setParticipations] = useState([]);
  const [entryCode, setEntryCode] = useState('');

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
        alert('Uspesna prijava na dogadjaj.');
        fetchParticipations();
      } else {
        alert('Prijava za dogadjaj neuspesna.')
      }
    }catch(err){
      alert('An unexpected error ocurred.')
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
        alert('Response from the server was not ok.');
      }
    } catch (err) {
      alert('Error during participations fetching.');
    }
  };

  return (
    <>
      <Header title="FON Event Manager" name={loggedUser.name} buttons={[]} />
      <div className="main">
        <AboutSection
          title="Stranica sa dogadjajima korisnika"
          description=""
        />
        <div className="main-content">
          <label htmlFor="entry-code">Kod za ulaz: </label>
          <input onChange={(e) => setEntryCode(e.target.value)} id="entry-code" type="text" />
          <button onClick={() => handleParticipate()} type="button">Pridruzi se dogadjaju</button>

          <div className="participant-event-list">
            <h2>Lista dogadjaja na koje sam prijavljen/a</h2>
            {participations.length === 0 ? (
              <p>Nema prijavljenih dogadjaja za prikaz.</p>
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
    </>
  );
};

export default ParticipantEventsPage;

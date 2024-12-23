import React, {useState} from 'react';
import '../style/ParticipateBox.css';

const ParticipateBox = ({participant, event, onClose}) => {

    const [entryCode, setEntryCode] = useState('');

    const handleClick = async(e) => {
        const request = {
            userId: participant.id,
            eventId: event.id,
            entryCode: entryCode
          };
        
          console.log(JSON.stringify(request))
        const response = await fetch('http://localhost:9000/api/participations/create',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(request),
            }
        );

        if (response.ok) {
            alert("Uspesno ste se prijavili na dogadjaj.");
          } else {
        alert('Failed to create the participation.');
        }
        onClose();
    }

    return (
        <div className='participate-box'>
            <label htmlFor="entry-code">Unesite kod za ulaz</label>
            <input onChange={(e) => setEntryCode(e.target.value)} type="text" name="entry-code" />
            <button onClick={handleClick}>Prijava</button>
            <button onClick={onClose}>Otkazi</button>
        </div>
    );
};

export default ParticipateBox;
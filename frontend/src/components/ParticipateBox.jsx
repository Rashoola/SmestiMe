import React, {useState} from 'react';

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

        if (!response.ok) {
            throw new Error('Failed to create the participation.');
          }
        
        alert("Uspesno ste se prijavili na dogadjaj.");
        onClose();
    }

    return (
        <div>
            <label htmlFor="entry-code">Unesite kod za ulaz</label>
            <input onChange={(e) => setEntryCode(e.target.value)} type="text" name="entry-code" />
            <button onClick={handleClick}>Prijava</button>
            <button onClick={onClose}>Otkazi</button>
        </div>
    );
};

export default ParticipateBox;
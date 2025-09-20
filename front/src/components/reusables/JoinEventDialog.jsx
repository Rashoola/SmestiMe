import React from 'react';
import {useState} from 'react';

const JoinEventDialog = ({isOpen, onClose}) => {
    const [entryCode, setEntryCode] = useState('');

    if(!isOpen){
        return null;
    }
  return (
     <div
      className="join-event-dialog-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="join-event-dialog"
        style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          border: '3px solid black',
          width: '33%',
          maxHeight: '80%',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            border: 'none',
            background: 'transparent',
            fontSize: '1.2rem',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        <strong>
          Pridruzivanje dogadjaju
        </strong>
        <label htmlFor="entry-code">Kod za ulaz: </label>
        <input onChange={(e) => setEntryCode(e.target.value)} type="text" name='entry-code' />   
        <button>Pridruzi se</button>
      </div>
    </div>
  );
};

export default JoinEventDialog;
import React, { useState, useEffect } from 'react';
import TableParticipantsBox from './TableParticipantsBox';

const TableItem = ({ table, onDropParticipant }) => {
    const [isFull, setIsFull] = useState(false);
    const [participantsAreVisible, setParticipantsAreVisible] = useState(false);
    const [participants, setParticipants] = useState([]);

    const toggleParticipantsBox = () => {
        setParticipantsAreVisible((prev) => !prev);
    };

    useEffect(() => {
        determineFullness();
        fetchParticipants();
    }, []);

    const handleDrop = (event) => {
        event.preventDefault();
        const participantId = parseInt(event.dataTransfer.getData('participantId'), 10);
        onDropParticipant(table.id, participantId);
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Necessary to allow dropping
    };

    const determineFullness = async () => {
        const response = await fetch('http://localhost:9000/api/organization-units/full', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(table),
        });

        if (response.ok) {
            const data = await response.json();
            setIsFull(data);
        }
    };

    const fetchParticipants = async () => {
        const response = await fetch(`http://localhost:9000/api/participations/organization-unit/${table.id}`);
        if (response.ok) {
            const data = await response.json();
            setParticipants(data);
        } else {
            alert('Error loading participants for the table.');
        }
    };

    return (
        <div
            className={`table-item ${isFull ? 'full-table-a' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <h3>{table.name}</h3>
            <h4>Капацитет: {table.numberOfSeats} места</h4>
            <button onClick={toggleParticipantsBox}>
                {participantsAreVisible ? 'Сакриј учеснике' : 'Прикажи учеснике'}
            </button>
            {participantsAreVisible && (
                <TableParticipantsBox participants={participants} onClose={toggleParticipantsBox} />
            )}
        </div>
    );
};

export default TableItem;



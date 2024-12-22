import React, {useState, useEffect} from 'react';
import ParticipantItem from './ParticipantItem';
import TableItem from './TableItem';
import Header from './Header';
import '../style/SittingArrangementPage.css';
import { useLocation, useParams } from 'react-router-dom';

const SittingArrangementPage = () => {
    const { eventId } = useParams();
    const location = useLocation();
    const booking = location.state?.booking; // Safely access booking
    const event = location.state?.event;

    const [waitingParticipants, setWaitingParticipants] = useState([]);
    const [tables, setTables] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        refresh();
      }, []);
    /*// Initialize state unconditionally
    const initialAssignments = booking
        ? {
              participants: waitingParticipants,
              tableAssignments: booking.sittingTables.reduce((acc, table) => {
                  acc[table.id] = [];
                  return acc;
              }, {}),
          }
        : { participants: [], tableAssignments: {} };

    const [assignments, setAssignments] = React.useState(initialAssignments);*/


    if (!booking) {
        return <p>Error: No booking data available.</p>; // Handle missing data
    }

    const fetchWaitingParticipants = async () => {
        console.log(JSON.stringify({eventId: event.id}));
      try {
        const response = await fetch(`http://localhost:9000/api/participations/event/${event.id}/waiting`);
        const data = await response.json();
        setWaitingParticipants(data);
      } catch (err) {
        setError('Failed to fetch waiting participants');
        console.log(err);
      }
    };

    const fetchTables = async () => {
        const response = await fetch(`http://localhost:9000/api/tables/by-booking/${booking.id}`);
        if(response.ok){
            const data = await response.json();
            setTables(data);
        }
    };

    const refresh = () => {
        fetchWaitingParticipants();
        fetchTables();
    }

    const handleDropParticipant = async (tableId, participantId) => {
        console.log( JSON.stringify({ tableId: tableId, participationId: participantId }))
        try {
            // Send the participant and table IDs to the backend
            const response = await fetch('http://localhost:9000/api/participations/assign-table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sittingTableId: tableId, participationId: participantId }),
            });

            if(response.ok){
                alert("The user has been added to the table.");
                window.location.reload();
            }
        } catch (error) {
            console.error('Error during backend communication:', error);
            alert('Error: Could not assign participant to table.');
        }
        
    };

    return (
        <>
        <Header title="СместиМе! - Смештање учесника"></Header>
        <h1>Смештање учесника за столове</h1>
        <p>На овој страници врши се смештање свих учесника који су се пријавили за догађај за одређени сто.
            Превуците учеснике са леве стране на сто по жељи, у листи са десне стране.
        </p>
        <div className="sitting-arrangement-page">
            
            <div className="participants-list">
                <h2>Учесници који чекају</h2>
                {waitingParticipants.map((participant) => (
                    <ParticipantItem key={participant.id} participant={participant} />
                ))}
            </div>

            <div className="tables-list">
                <h2>Столови</h2>
                {tables.map((table) => (
                    <TableItem
                        key={table.id}
                        table={table}
                        onDropParticipant={handleDropParticipant}
                    />
                ))}
            </div>
        </div>
        </>
    );
};

export default SittingArrangementPage;



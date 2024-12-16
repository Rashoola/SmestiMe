import React, {useState, useEffect} from 'react';
import ParticipantItem from './ParticipantItem';
import TableItem from './TableItem';
import '../style/SittingArrangementPage.css';
import { useLocation, useParams } from 'react-router-dom';

const SittingArrangementPage = () => {
    const { eventId } = useParams();
    const location = useLocation();
    const booking = location.state?.booking; // Safely access booking
    const event = location.state?.event;

    const [waitingParticipants, setWaitingParticipants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    
        fetchWaitingParticipants();
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
            }
        } catch (error) {
            console.error('Error during backend communication:', error);
            alert('Error: Could not assign participant to table.');
        }
    };

    return (
        <div className="sitting-arrangement-page">
            <div className="participants-list">
                <h2>Participants</h2>
                {waitingParticipants.map((participant) => (
                    <ParticipantItem key={participant.id} participant={participant} />
                ))}
            </div>

            <div className="tables-list">
                <h2>Tables</h2>
                {booking.sittingTables.map((table) => (
                    <TableItem
                        key={table.id}
                        table={table}
                        onDropParticipant={handleDropParticipant}
                    />
                ))}
            </div>
        </div>
    );
};

export default SittingArrangementPage;



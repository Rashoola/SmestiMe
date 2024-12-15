import React from 'react';
import ParticipantItem from './ParticipantItem';
import TableItem from './TableItem';
import '../style/SittingArrangementPage.css';
import { useLocation } from 'react-router-dom';

const SittingArrangementPage = () => {
    const location = useLocation();
    const booking = location.state?.booking; // Safely access booking

    // Initialize state unconditionally
    const initialAssignments = booking
        ? {
              participants: [
                  { id: 1, name: "Alice" },
                  { id: 2, name: "Bob" },
                  { id: 3, name: "Charlie" },
                  { id: 4, name: "Dana" },
              ],
              tableAssignments: booking.sittingTables.reduce((acc, table) => {
                  acc[table.id] = [];
                  return acc;
              }, {}),
          }
        : { participants: [], tableAssignments: {} };

    const [assignments, setAssignments] = React.useState(initialAssignments);

    if (!booking) {
        return <p>Error: No booking data available.</p>; // Handle missing data
    }

    const handleDropParticipant = async (tableId, participantId) => {
        try {
            // Send the participant and table IDs to the backend
            const response = await fetch('http://localhost:9000/participations/assign-table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableId, participantId }),
            });

            if (response.ok) {
                // Update state only if the backend call was successful
                setAssignments((prev) => {
                    const updatedTableAssignments = { ...prev.tableAssignments };

                    // Remove participant from their current table or participant list
                    Object.keys(updatedTableAssignments).forEach((key) => {
                        updatedTableAssignments[key] = updatedTableAssignments[key].filter(
                            (id) => id !== participantId
                        );
                    });

                    // Add participant to the target table
                    updatedTableAssignments[tableId].push(participantId);

                    return {
                        participants: prev.participants.filter(
                            (p) => p.id !== participantId
                        ),
                        tableAssignments: updatedTableAssignments,
                    };
                });
            } else {
                console.error('Failed to assign participant.');
                alert('Error: Could not assign participant to table.');
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
                {assignments.participants.map((participant) => (
                    <ParticipantItem key={participant.id} participant={participant} />
                ))}
            </div>

            <div className="tables-list">
                <h2>Tables</h2>
                {booking.sittingTables.map((table) => (
                    <TableItem
                        key={table.id}
                        table={table}
                        assignments={assignments.tableAssignments}
                        participants={assignments.participants}
                        onDropParticipant={handleDropParticipant}
                    />
                ))}
            </div>
        </div>
    );
};

export default SittingArrangementPage;



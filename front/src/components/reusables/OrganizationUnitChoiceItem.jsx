import React from 'react';
import { useState } from 'react';
import UnitParticipantsDialog from './UnitParticipantsDialog';

const OrganizationUnitChoiceItem = ({ unit }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    if(!dialogOpen){
      setDialogOpen(true);
    } 
  }

  const closeDialog = () => {
    if(dialogOpen){
      setDialogOpen(false);
    }
  }

  const assign = async (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    const draggedParticipant = JSON.parse(data);

    if (!window.confirm(`Are you sure you want to assign ${draggedParticipant.user.name} to ${unit.name}?`)) {
      return; // stop if user cancels
    }

    const url = 'http://localhost:9000/api/participations/assign-unit';
    const payload = {
      participationId: draggedParticipant.id,
      organizationUnitId: unit.id
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Uspesno rasporedjivanje korisnika na svoje mesto.');
        window.location.reload();
      } else {
        alert('Bad response from the server.');
      }
    } catch (err) {
      alert('Error while connecting to the server.');
    }
  };


  return (
    <div
      className='organization-unit-choice-item'
      onDrop={assign}
      onDragOver={(e) => e.preventDefault()}
    >
      <p>{unit.name}</p>
      <p>Broj slobodnih mesta: {unit.capacityLeft}</p>
      <button type='button' onClick={openDialog}>Pogledaj ucesnike</button>
      <UnitParticipantsDialog unit={unit} onClose={closeDialog} isOpen={dialogOpen}></UnitParticipantsDialog>
    </div>
  );
};

export default OrganizationUnitChoiceItem;
import React from 'react';
import UnitParticipantsDialog from './UnitParticipantsDialog';
import {useState} from 'react';
import '../../style/OrganizationUnitDisplayItem.css';

const OrganizationUnitDisplayItem = ({unit, participation}) => {
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

  const assignUnit = async () => {
    const url = 'http://localhost:9000/api/participations/assign-unit';
    const payload = {
            participationId: participation.id,
            organizationUnitId: unit.id
          };
    try {
      const response = await fetch(url, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );
      if(response.ok){
        alert('Uspesno ste izabrali svoje mesto.');
      } else {
        alert('Neuspesan odabir mesta.');
      }

    } catch {
      alert('Error during connection to the server.')
    }
  }

  return (
    <div className='organization-unit-display-item'>
        <strong>{unit.name}</strong>
        <p>Broj slobodnih mesta: {unit.capacityLeft}</p>
        <button type='button' onClick={openDialog}>Vidi ucesnike</button>
        <button onClick={assignUnit}>Izaberi</button>
        <UnitParticipantsDialog unit={unit} isOpen={dialogOpen} onClose={closeDialog}></UnitParticipantsDialog>
    </div>
  );
};

export default OrganizationUnitDisplayItem;
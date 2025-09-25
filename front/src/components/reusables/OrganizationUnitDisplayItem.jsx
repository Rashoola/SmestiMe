import React from 'react';
import UnitParticipantsDialog from './UnitParticipantsDialog';
import {useState} from 'react';

const OrganizationUnitDisplayItem = ({unit}) => {
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
    try {

    } catch {
      
    }
  }

  return (
    <div className='organization-unit-display-item'>
        <p>{unit.name}</p>
        <button type='button' onClick={openDialog}>Vidi ucesnike</button>
        <button>Izaberi</button>
        <UnitParticipantsDialog unit={unit} isOpen={dialogOpen} onClose={closeDialog}></UnitParticipantsDialog>
    </div>
  );
};

export default OrganizationUnitDisplayItem;
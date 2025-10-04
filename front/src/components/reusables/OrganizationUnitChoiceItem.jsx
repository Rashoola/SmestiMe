import React from 'react';
import { useState } from 'react';
import UnitParticipantsDialog from './UnitParticipantsDialog';
import '../../style/OrganizationUnitChoiceItem.css';
import tableSymbol from '../../images/table_symbol.png';
import roomSymbol from '../../images/room_symbol.png';
import busSymbol from '../../images/bus_symbol.png';
import carSymbol from '../../images/car_symbol.png';

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

  const getSymbol = () => {
    switch (unit.unitType) {
      case 'TABLE':
        return tableSymbol;
      case 'ROOM':
        return roomSymbol;
      case 'BUS':
        return busSymbol;
      case 'CAR':
        return carSymbol;
      default:
        return null;
    }
  };


  return (
    <div
      className='organization-unit-choice-item'
      onDrop={assign}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className='symbol-container'>
        <img src={getSymbol()} alt="" />
      </div>
      <div className='middle-part'>
      <strong>{unit.name}</strong>
      <p>Broj slobodnih mesta: {unit.capacityLeft}</p>
      <button type='button' onClick={openDialog}>Pogledaj ucesnike</button>
      <UnitParticipantsDialog unit={unit} onClose={closeDialog} isOpen={dialogOpen}></UnitParticipantsDialog>
      </div>
    </div>
  );
};

export default OrganizationUnitChoiceItem;
import React from 'react';
import { useState } from 'react';
import UnitParticipantsDialog from './UnitParticipantsDialog';
import CircularCapacity from './CircularCapacity';
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

      const toggleDialog = () => {
    setDialogOpen(prev => !prev);
  };

  const assign = async (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    const draggedParticipant = JSON.parse(data);

    if (!window.confirm(`Да ли сте сигурни да желите да распоредите учесника ${draggedParticipant.user.name} на јединицу ${unit.name}?`)) {
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
        alert('Успешно распоређивање корисника.');
        window.location.reload();
      } else {
        alert('Неуспешно распоређивање корисника.');
      }
    } catch (err) {
      alert('Грешка приликом повезивања.');
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
      <p>Број слободних места {unit.capacityLeft}</p>
      <button type='button' onClick={toggleDialog}>{dialogOpen ? 'Сакриј' : 'Прикажи учеснике'}</button>
      <UnitParticipantsDialog unit={unit} onClose={closeDialog} isOpen={dialogOpen}></UnitParticipantsDialog>
      </div>
      <div className='capacity-display'>
        <p style={{marginTop: 0}}>Попуњеност</p>
      <CircularCapacity capacity={unit.capacity} capacityLeft={unit.capacityLeft} size={50} stroke={5}></CircularCapacity>
      </div>
    </div>
  );
};

export default OrganizationUnitChoiceItem;
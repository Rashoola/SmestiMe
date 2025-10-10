import React from 'react';
import UnitParticipantsDialog from './UnitParticipantsDialog';
import CircularFullness from './CircularCapacity';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/OrganizationUnitDisplayItem.css';
import tableSymbol from '../../images/table_symbol.png';
import roomSymbol from '../../images/room_symbol.png';
import busSymbol from '../../images/bus_symbol.png';
import carSymbol from '../../images/car_symbol.png';

const OrganizationUnitDisplayItem = ({unit, participation}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

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
        navigate('/dashboard');
      } else {
        alert('Neuspesan odabir mesta.');
      }

    } catch {
      alert('Error during connection to the server.')
    }
  }

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
    <div className='organization-unit-display-item'>
      <div className='symbol-container'>
        <img src={getSymbol()} alt="" />
      </div>
      <div className='middle-part'>
        <strong>{unit.name}</strong>
        <p>Broj slobodnih mesta: {unit.capacityLeft}</p>
        <button type='button' onClick={toggleDialog}>{dialogOpen ? 'Сакриј' : 'Прикажи учеснике'}</button>
        <button style={{backgroundColor: '#00d93a'}} onClick={assignUnit}>Izaberi</button>
        <UnitParticipantsDialog unit={unit} isOpen={dialogOpen} onClose={closeDialog}></UnitParticipantsDialog>
        </div>
        <div className='capacity-display'>
          <p>Popunjenost:</p>
          <CircularFullness capacity={unit.capacity} capacityLeft={unit.capacityLeft} size={50} stroke={5}></CircularFullness>
        </div>
    </div>
  );
};

export default OrganizationUnitDisplayItem;
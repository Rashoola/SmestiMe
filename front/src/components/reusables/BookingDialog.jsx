import React from 'react';
import {useState} from 'react';
import OrganizationUnitItem from './OrganizationUnitItem';

const BookingDialog = ({booking, onAddOrganizationUnit, onRemoveOrganizationUnit, onChangeOrganizationUnit}) => {
  return (
    <div className='booking-dialog' style={{height: '33%', width: '33%', position: 'absolute', top: '50%', left: '50%', border: '3px solid black'}}>
      <strong>Unos organizationih jedinica za rezervaciju lokacije {booking.location.name}</strong>
      <div className='organization-unit-input'>
        <label htmlFor="unit-type">Tip jedinice</label>
        <select name="unit-type" id=""></select>

        <label htmlFor="">Naziv</label>
        <input type="text" name='name' />

        <label htmlFor="">Kapacitet</label>
        <input type="number" name='capacity' />

        <button onClick={onAddOrganizationUnit}>Dodaj</button>
      </div>
      <div className='organization-unit-list'>
        <ul>
        {booking.organizationUnits.map((unit, index) => (
            <li key={index}>
            <OrganizationUnitItem unit={unit}></OrganizationUnitItem>
            </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingDialog;
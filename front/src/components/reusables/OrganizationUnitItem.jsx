import React from "react";
import '../../style/OrganizationUnitItem.css';
import tableSymbol from '../../images/table_symbol.png';
import roomSymbol from '../../images/room_symbol.png';
import busSymbol from '../../images/bus_symbol.png';
import carSymbol from '../../images/car_symbol.png';

const OrganizationUnitItem = ({ unit, onRemove }) => {

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
        <div className="organization-unit-item">
            <div className="symbol-container">
                <img src={getSymbol()} alt="" />
            </div>
            <div className="middle-part">
           <strong>{unit.name}</strong>
           <p>Капацитет: {unit.capacity}</p>
           <button style={{backgroundColor: 'red', color: 'white'}} onClick={onRemove}>Уклони јединицу</button>
           </div>
        </div>
    );
};

export default OrganizationUnitItem;





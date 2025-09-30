import React from "react";
import '../../style/OrganizationUnitItem.css';

const OrganizationUnitItem = ({ unit, onRemove }) => {
    return (
        <div className="organization-unit-item">
           <p>{unit.name} ({unit.unitType})</p>
           <p>Kapacitet: {unit.capacity}</p>
           <button onClick={onRemove}>Ukloni</button>
        </div>
    );
};

export default OrganizationUnitItem;





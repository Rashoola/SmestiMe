import React from 'react';

const OrganizationUnitChoiceItem = ({unit}) => {
  return (
    <div className='organization-unit-choice-item'>
      <p>{unit.name}</p>
      <button>Pogledaj ucesnike</button>
    </div>
  );
};

export default OrganizationUnitChoiceItem;
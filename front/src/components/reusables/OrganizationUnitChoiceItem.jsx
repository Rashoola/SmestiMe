import React from 'react';

const OrganizationUnitChoiceItem = ({ unit }) => {
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
      <button>Pogledaj ucesnike</button>
    </div>
  );
};

export default OrganizationUnitChoiceItem;
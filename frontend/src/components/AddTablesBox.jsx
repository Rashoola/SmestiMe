import React, { useState } from 'react';
import '../style/AddTablesBox.css';

const AddTablesBox = ({ bookingId, onClose, onConfirm }) => {
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');

  const addTable = () => {
    if (tableName.trim() && numberOfSeats > 0) {
      setTables([...tables, { name: tableName, numberOfSeats: parseInt(numberOfSeats, 10) }]);
      setTableName('');
      setNumberOfSeats('');
    }
  };

  const removeTable = (index) => {
    setTables(tables.filter((_, i) => i !== index));
  };

  const confirmTables = () => {
    const payload = { bookingId, tables };
    console.log(payload)
    fetch('http://localhost:9000/api/tables/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          alert("Столови су успешно сачувани");
        } else {
          alert("Дошло је до грешке при чувању столова.");
        }
        
      })
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Додајте сто у резервацију број {bookingId}</h3>
        <div className="modal-inputs">
          <input
            type="text"
            placeholder="Назив стола"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Број седећих места"
            value={numberOfSeats}
            onChange={(e) => setNumberOfSeats(e.target.value)}
          />
          <button onClick={addTable}>Додај</button>
        </div>
        <ul className="modal-table-list">
          {tables.map((table, index) => (
            <li key={index}>
              {table.name} - {table.numberOfSeats} места
              <button onClick={() => removeTable(index)}>Уклони</button>
            </li>
          ))}
        </ul>
        <div className="modal-actions">
          <button onClick={confirmTables}>Потврди унос</button>
          <button onClick={onClose}>Затвори</button>
        </div>
      </div>
    </div>
  );
};

export default AddTablesBox;




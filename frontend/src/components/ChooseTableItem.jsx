import React, {useState, useEffect} from 'react';
import '../style/ChooseTableItem.css';

const ChooseTableItem = ({table, participation}) => {

    const [dataToSend, setDataToSend] = useState({
        participationId: 0,
        sittingTableId: 0
    });

    const[isFull, setIsFull] = useState(false);

    useEffect(()=>{
        determineFullness();
    }, []);

    const determineFullness = async () => {
        console.log(table);
        const response = await fetch('http://localhost:9000/api/tables/full',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(table)
            }
        );

        if(response.ok){
            const data = await response.json();
            console.log(data);
            setIsFull(data);
        }
    }

    const handleChooseTable = async (e) => {
        dataToSend.participationId = participation.id;
        dataToSend.sittingTableId = table.id;

        const response = await fetch('http://localhost:9000/api/participations/assign-table',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            }
        );

        if(response.ok){
            alert("Successfull table choice.");
            window.location.reload();
        } else {
            alert("An error ocurred.");
        }
    }

    return(
        <div className={`choose-table-item ${isFull ? 'full-table' : ''}`}>
            <h3>{table.name}</h3>
            <button onClick={handleChooseTable} disabled={isFull}>
            {isFull ? 'Сто је пун' : 'Изабери сто'}
            </button>
        </div>


    );
};

export default ChooseTableItem;
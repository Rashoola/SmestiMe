import React, {useState} from 'react';

const ChooseTableItem = ({table, participant}) => {

    const [dataToSend, setDataToSend] = useState({
        participationId: 0,
        sittingTableId: 0
    });

    const handleChooseTable = async (e) => {
        dataToSend.participationId = participant.id;
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
        } else {
            alert("An error ocurred.");
        }
    }

    return(
        <div className='choose-table-item'>
            <h3>{table.name}</h3>
            <button onClick={handleChooseTable}>Choose</button>
        </div>
    );
};

export default ChooseTableItem;
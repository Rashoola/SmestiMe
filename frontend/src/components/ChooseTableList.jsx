import React, {useState, useEffect} from 'react';
import ChooseTableItem from './ChooseTableItem';

const ChooseTableList = ({booking, participation}) => {

    const [tables, setTables] = useState([]);

    useEffect(() => {
        setTables(booking.sittingTables);
    }, []);

    return(
        <div className='choose-table-list'>
            {tables.length === 0 ? (
        <p>Nema stolova za prikaz.</p>
      ) : (
        tables.map((table) => <ChooseTableItem key={table.id} table={table} participation={participation}/>)
      )}
        </div>
    );
};

export default ChooseTableList;
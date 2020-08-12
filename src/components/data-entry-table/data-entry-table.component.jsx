import React from 'react';

import TableTitle from '../table-title/table-title.component';
import DataEntry from '../data-entry/data-entry.component';

import './data-entry-table.styles.scss';

const DataTable = () => {
    return (
        <div className='data-table'>
            <TableTitle />
            <DataEntry />

        </div>
    );
};

export default DataTable;
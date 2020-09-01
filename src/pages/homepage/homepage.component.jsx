import React, { useState, useEffect, useContext } from 'react';

import DataController from '../../components/data-entry-controller/data-entry-controller.component';
import DataTable from '../../components/data-entry-table/data-entry-table.component';


import './homepage.styles.scss';

const HomePage = () => {

    return (
        <div className='homepage'>
            <DataController />
            <DataTable  />
        </div>
    )
}

export default HomePage;
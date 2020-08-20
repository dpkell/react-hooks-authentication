import React, { useState, useEffect, useContext } from 'react';

import DataController from '../../components/data-entry-controller/data-entry-controller.component';
import DataTable from '../../components/data-entry-table/data-entry-table.component';

import { AuthContext } from '../../AuthContext';

import './homepage.styles.scss';

const HomePage = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        <div className='homepage'>
            <DataController />
            <DataTable currentUser={currentUser} />
        </div>
    )
}

export default HomePage;
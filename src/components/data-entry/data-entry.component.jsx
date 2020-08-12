import React from 'react';

import { ReactComponent as RemoveItemIcon } from '../../assets/cross.svg';

import './data-entry.styles.scss';

const DataEntry = (props) => {

    return(
        <div className='data-wrapper'>
            <div className='item-name-wrapper'>
                <p className='item-name-text'>
                    Item's Name goes here
                </p>
            </div>
            <div className='item-description-wrapper'>
                <p className='item-description-text'>
                    Item description goes here, but let's make a really really really long item description to test hiding overflow!
                </p>
            </div>
            <div className='remove-button' >
                <RemoveItemIcon className='remove-item-icon' type='submit' />
            </div>
        </div>
    );
};

export default DataEntry;
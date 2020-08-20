import React from 'react';

import { ReactComponent as RemoveItemIcon } from '../../assets/cross.svg';

import './data-entry.styles.scss';

const DataEntry = (item) => {
    const { itemName, itemDescription } = item;
    console.log(`${itemName} ${itemDescription}`);
    return(
        <div className='data-wrapper'>
            <div className='item-name-wrapper'>
                <p className='item-name-text'>
                    {itemName}
                </p>
            </div>
            <div className='item-description-wrapper'>
                <p className='item-description-text'>
                    {itemDescription}
                </p>
            </div>
            <div className='remove-button' >
                <RemoveItemIcon className='remove-item-icon' type='submit' />
            </div>
        </div>
    );
};

export default DataEntry;
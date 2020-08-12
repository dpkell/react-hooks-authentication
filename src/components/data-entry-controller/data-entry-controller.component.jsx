import React, {useState} from 'react';

import { ReactComponent as SubmitIcon } from '../../assets/check.svg';

import './data-entry-controller.styles.scss';

const DataController = () => {
   const [entryData, setEntryData] = useState({
        itemName: '',
        itemDescription: ''
    });

    const { itemName, itemDescription } = entryData;

    const handleChange = event => {
        const { name, value } = event.target;
        setEntryData({...entryData, [name]: value})
    }

    return (
        <div className='controller-container'>
            <form className='data-entry-form'>
                <div className='form-inputs'>
                    <label className='item-name-label'>
                        Item Name:
                        <input 
                            className = 'item-name'
                            type = 'text'
                            name = 'itemName'
                            value = {itemName}
                            onChange = {handleChange}
                            placeholder = 'Item Name'
                            required
                        />
                    </label>
                    
                    <label className='item-description-label'>
                        Item Description:
                        <input 
                            className='item-description'
                            type = 'text'
                            name = 'itemDescription'
                            value = {itemDescription}
                            onChange = {handleChange}
                            placeholder = 'Item Description'
                            required
                        />
                    </label>
                </div>
                <button className = 'submit-button' type='submit'>
                    <SubmitIcon className='submit-icon' />
                </button>
            </form>
        </div>
    );
};

export default DataController;
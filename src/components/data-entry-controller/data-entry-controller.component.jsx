import React, { useState, useContext, useEffect, useRef } from 'react';

import { AuthContext } from '../../AuthContext';
import usePersistedState from '../../usePersistedState';
import { createItemDocument } from '../../firebase/firebase.utils';

import { ReactComponent as SubmitIcon } from '../../assets/check.svg';
import './data-entry-controller.styles.scss';

const DataController = () => {
   const [entryData, setEntryData] = useState({
        itemName: '',
        itemDescription: '',
    });
    const [entryId, setEntryId] = usePersistedState('dataId', 0);
    const [isLoading, setIsLoading] = useState(false);
    const _isMounted = useRef(true);


    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    })

    const { currentUser } = useContext(AuthContext);

    const { itemName, itemDescription } = entryData;

    const { dataId } = entryId;
    
    const handleChange = event => {
        const { name, value } = event.target;
        setEntryData({...entryData, [name]: value});
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setIsLoading(true);
        setEntryId({dataId: dataId+1});
        try {
            await createItemDocument(currentUser, entryData, entryId );
        } catch (error) {
            console.log('Error submitting item to firebase: ', error.message)
        } finally {
            if(_isMounted.current) {
                setIsLoading(false);
                setEntryData({
                    itemName: '',
                    itemDescription: ''
                });
            }
        }
    };



    return (
        <div className='controller-container'>
            <form className='data-entry-form' onSubmit={handleSubmit}>
                <div className='form-inputs' >
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
import React, { 
    useContext,
    useEffect,
    useState
} from 'react';

import TableTitle from '../table-title/table-title.component';
import DataEntry from '../data-entry/data-entry.component';

import { AuthContext } from '../../AuthContext';

import { firestore } from '../../firebase/firebase.utils';

import './data-entry-table.styles.scss';

const DataTable = () => {
    const { currentUser } = useContext(AuthContext);
    const [itemsList, setItemsList] = useState([]);
    

    useEffect( () => {
        const unsubscribe = async () => {
            const itemsRef = firestore.collection('users').doc(`${currentUser.id}`).collection('items');
            itemsRef.onSnapshot( itemsSnapShot => {
                const itemArr = [];
                itemsSnapShot.docs.map(doc => {
                    itemArr.push(doc.data());
                })
                itemsListSort(itemArr)
                setItemsList(itemArr);
                }
            );
        };
        unsubscribe();

        return () => {
            unsubscribe();
        }
    }, [currentUser]);

    const itemsListSort = (itemArr) => {
        itemArr.sort(function(a, b){return a.dataId - b.dataId});
    }

    

    return (
        <div className='data-table'>
            <TableTitle />
            
            {
                itemsList.map((item) => (
                    <DataEntry key={item.dataId} {...item} />
                ))
            }

        </div>
    );
};

export default DataTable;

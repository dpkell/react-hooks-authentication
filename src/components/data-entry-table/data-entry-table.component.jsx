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
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect( () => {
        const unsubscribe = async () => {
            const itemsRef = firestore.collection('users').doc(`${currentUser.id}`).collection('items');
            const snapShot = await itemsRef.get();
            try {
                const itemArr = [];
                snapShot.docs.map(doc => {
                    const item = {
                        ...doc.data()
                    }
                    itemArr.push(item);
                });
                setItemsList(itemArr);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }  
        };
        unsubscribe();
    }, [currentUser]);

    if (isLoading) {
        return <>Loading...</>
    }

    console.log(itemsList);

    return (
        <div className='data-table'>
            <TableTitle />
            
            {
                itemsList.map( item => (
                    <DataEntry key={item.dataId} {...item} />
                ))
            }

        </div>
    );
};

export default DataTable;

import React, { 
    createContext, 
    useContext, 
    useState, 
    useEffect
} from 'react';

import { AuthContext } from './AuthContext';
import { firestore, mapItemsCollection } from './firebase/firebase.utils';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const [itemsList, setItemsList] = useState([]);
    
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
            } catch (error) {
                console.log(error.message);
            }  
        };
        unsubscribe();

        return () => {
            unsubscribe();
        }
    }, [currentUser]);

    return (
        <DataContext.Provider value = {{ itemsList }}>
            {children}
            {console.log(itemsList)}
        </DataContext.Provider>
    )

}

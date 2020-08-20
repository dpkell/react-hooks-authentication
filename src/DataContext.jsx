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

    const unsubscribe = async (currentUser) => {
        if (currentUser) {
            firestore.collection('users')
            .doc(`${currentUser.id}`)
            .collection('items')
            .onSnapshot( snapShot => {
                if (snapShot.size) {
                    let itemsArr = [];
                    snapShot.forEach(doc => 
                        itemsArr.push({...doc.data() })
                    );
                    setItemsList(itemsArr);
                }
            }); 
        }
    };

    useEffect( () => {
        unsubscribe(currentUser);
        return () => {
            unsubscribe(currentUser);
        }

    }, []);

    return (
        <DataContext.Provider value = {{ itemsList }}>
            {children}
            {console.log(itemsList)}
        </DataContext.Provider>
    )

}

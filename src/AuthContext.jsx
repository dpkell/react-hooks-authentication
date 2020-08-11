import React, { useEffect, useState, createContext } from 'react';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// Creation of Authorized User Context

export const AuthContext = createContext();

// Authorized User Context Provider. Inititalizes currentUser state, if user object changes, sets state to new user.
// Subsequently passes the currentUser state to the rest of the children components.

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }
            setCurrentUser(userAuth);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ currentUser }}
        >
            {children}
            {console.log(currentUser)}
        </AuthContext.Provider>
    );

};
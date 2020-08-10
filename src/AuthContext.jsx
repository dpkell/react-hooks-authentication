import React, { useEffect, useState, createContext } from 'react';

import { auth } from './firebase/firebase.utils';

// Creation of Authorized User Context

export const AuthContext = createContext();

// Authorized User Context Provider. Inititalizes currentUser state, if user object changes, sets state to new user.
// Subsequently passes the currentUser state to the rest of the children components.

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => setCurrentUser(user));

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{ currentUser }}
        >
            {children}
        </AuthContext.Provider>
    );

};
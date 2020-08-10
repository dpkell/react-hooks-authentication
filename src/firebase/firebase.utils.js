import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Firebase API configuration object

const config = {
    apiKey: "AIzaSyC_qaO8QgRU7vN_6hHLDTzivWvqrw-n4RQ",
    authDomain: "mastering-hooks.firebaseapp.com",
    databaseURL: "https://mastering-hooks.firebaseio.com",
    projectId: "mastering-hooks",
    storageBucket: "mastering-hooks.appspot.com",
    messagingSenderId: "984745416355",
    appId: "1:984745416355:web:ffa81bee5615c7194d9116",
    measurementId: "G-LFWGXCWFPV"
};

// Firebase initialization

firebase.initializeApp(config);

// Declaration of exporting of Firebase Auth and Firestore functions

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google sign-in

export const googleProvider = new firebase.auth.GoogleAuthProvider();

// GoogleAuthProvider method that allows Google to prompt the user with a list of accounts they have available to sign-in.

googleProvider.setCustomParameters({prompt: 'select_account'});

// Google sign-in function

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

// Takes userAuth objective and any additional data and queries for snapshot of document. If no snapshot is found, a document
// is created

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });

            console.log(userRef);
            
        } catch (error) {
            console.log('error creating user document: ', error.message);
        }
    }

    return userRef;
};
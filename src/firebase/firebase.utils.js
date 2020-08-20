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

export const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleProvider);
}

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
        } catch (error) {
            console.log('Error creating user document: ', error.message);
        }
    }
    return userRef;
};

export const createItemDocument = async (userAuth, item, additionalData) => {
     if(!userAuth) return;

    const { itemName, itemDescription } = item;
    const createdAt = new Date();

    const itemDocInit = firestore.collection('users').doc(userAuth.id).collection('items').doc();
    const itemDocSnapShot = await itemDocInit.get();
    const itemDocId = itemDocSnapShot.id;
    const itemRef = firestore.doc(`users/${userAuth.id}/items/${itemDocId}`);

    try {
        await itemRef.set({
            itemName,
            itemDescription,
            createdAt,
            ...additionalData
        });
        
    } catch (error) {
        console.log('Error creating item document: ', error.message);
    }

    return itemRef;
};

export const deleteItemDocument = async (userAuth, itemName) => {
    if(!userAuth) return;

    
    const itemsRef = firestore.collection('users').doc(`${userAuth.id}`).collection('items');
    const query = itemsRef.where('itemName', '==', `${itemName}`);

    const querySnapShot = await query.get();
    console.log(querySnapShot);
    if (!querySnapShot.empty) {
        console.log('if Statement accessed.')
        try {
            querySnapShot.forEach(doc => {
                doc.ref.delete();
            });
            console.log('Document deleted successfully!');
            
        } catch (error) {
            console.log('Error deleting item document', error.message);
        }
    }
};

export const mapItemsCollection = async (userAuth) => {
    if (!userAuth) return;

    const itemsRef = firestore.collection('users').doc(`${userAuth.id}`).collection('items');

    const snapShot = await itemsRef.get()

    // try {
    //     snapShot.docs.map(doc => {
    //         const data = doc.data();
    //         console.log(data);
    //         return data;
    //     });
    // } catch (error) {
    //     console.log('Error retrieving data from items collection: ', error.message);
    // }

    return snapShot;
};
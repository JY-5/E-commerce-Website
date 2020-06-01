import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAisIG1CQ5qAUWhSavFpAxmf9vjHilJ2l8",
    authDomain: "crwn-db-2b379.firebaseapp.com",
    databaseURL: "https://crwn-db-2b379.firebaseio.com",
    projectId: "crwn-db-2b379",
    storageBucket: "crwn-db-2b379.appspot.com",
    messagingSenderId: "822888565109",
    appId: "1:822888565109:web:50530b7c5b698ea6d4ab3c",
    measurementId: "G-ND8GPWYNBX"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
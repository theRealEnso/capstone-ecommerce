import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'; // getDoc function only gets data inside a document. Likewise, setDoc function only sets the data inside a document. The doc function is what allows us to get the entire document instance (super confusing naming convention!)

const firebaseConfig = {
  apiKey: "AIzaSyD79nPXhJ9-gsSaP1j0XFy09oMdBT-Kzhg",
  authDomain: "crown-clothing-db-137a9.firebaseapp.com",
  projectId: "crown-clothing-db-137a9",
  storageBucket: "crown-clothing-db-137a9.appspot.com",
  messagingSenderId: "585062552288",
  appId: "1:585062552288:web:b7a81d1e8452dc797b7685",
  measurementId: "G-SNLMY4PTJ3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

//setup signing in with providers
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


//////////////////     CREATING DATABASE AND CREATING COLLECTION/DOC/STORING DATA  //////////////////////////////////////////////
export const db = getFirestore(); //first, instantiate firestore

//async function that accepts user authentication object and store inside of firestore =>  (reminder that userAuth is just a placeholder name). We will be passing in destructured user data directly from the response object back in the SignInComponent
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    //doc function takes 3 arguments (firestore database instance, name of collection (will set collection with name if it does not exist), and a unique ID)
    const userDocRef = doc(db, 'users', userAuth.uid); //use unique id from user object to get document reference
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists()); //.exists method returns a boolean

     //If user data does not exist yet, then use setDoc function to set the data inside the document, and then place document inside the database. Otherwise, document already exists and simply return to me that document
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth; // destructure directly from user data
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch (error) {
            console.log(`error creating the user: ${error}`)
        }
    } else {
        return userDocRef;
    }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || ! password) return; //if no email or password, then exit and don't run the function

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || ! password) return; //if no email or password, then exit and don't run the function

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
};

//note that auth i.e getAuth() is sort of like a state that keeps track of user data (if the user is signed in) or null if the user is signed out
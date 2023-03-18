import {createContext, useState, useEffect} from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utilities/firebase/firebaseUtilities';

//actual value we want to access (initally set up default values of null)
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// Create UserProvider, which is an actual functional component that receives children as props. This provider allows any child components to access the values inside of its useState (in this case, currentUser and setCurrentUser).
//We wrap this provider around the portion(s) of our code that matters, or in other words, we will wrap this provider around the entire app component back in index.js. So, the app componenent and everything nested under it will be the children in this case
export const UserProvider = ({children}) => { 
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => { //user is again a placeholder name that either returns null (if user is signed out) or returns user object (if user is signed in). Back in utilities file, we are passing auth instance, which means placeholder user will take on values of auth instance
            console.log(user);
            if(user) {
                createUserDocumentFromAuth(user); // this function already handles both cases where user exists and where user does not exist
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
import {createContext, useEffect, useReducer} from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utilities/firebase/firebaseUtilities';

//actual value we want to access (initally set up default values of null)
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

//reducers are just a function that returns us back a new object with shape of data we want to store.
//In this case, we want to store data related to the user-- since we are already storing currentUser in the context, we will add currentUser to the object.
// Reducers will change the object we get back based on the ACTION. This object is the STATE in the reducer
//
const userReducer = (state, action) => {
    console.log(`dispatched!`)
    console.log(action);
    const {type, payload} = action; // action always has a type and an optional payload. Destructure these right off the bat
    //payload is the thing that stores the value of what we are updating the reducer with! In the case of the user context, we want to store the actual user data inside of the payload! ... type will always be of string data type

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            //return new object that spreads through the previous values, and then update the only relevant value we care about, which is in this case, currentUser. Since new object / state is returned in the reducer, React recognizes this and re-renders the entire UserProvider to reflect the updates
            return {
                ...state, // give me the same values on the previous state object...
                currentUser: payload // but this time, modify currentUser by setting currentUser to user data, which is stored in the payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`)
    };
};

// Create UserProvider, which is an actual functional component that receives children as props. This provider allows any child components to access the values inside of its useState (in this case, currentUser and setCurrentUser).
//We wrap this provider around the portion(s) of our code that matters, or in other words, we will wrap this provider around the entire app component back in index.js. So, the app componenent and everything nested under it will be the children in this case

const INITIAL_STATE = {
    currentUser: null
};


export const UserProvider = ({children}) => { 
    // const [currentUser, setCurrentUser] = useState(null);

    //replacing useState with useReducer => entire userReducer object as 1st argument, INITIAL_STATE object as 2nd, which has the currentUser's default state as null which is what we had before
    //useReducer hook always gives us two arguments => 1st is the current state object (aka current values being stored by the reducer)  + a dispatch function 
    // (whenever the dispatch function is called/executed, we need to pass it an action object.

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
    const {currentUser} = state;
    console.log(currentUser);

    // define what setCurrentUser will do. It still receives a user object from google API as before when working with useState. Since we now work with reducers, we have a different way of updating the state. The dispatch function must be called. Dispatch receives an action object => this object tells the reducer what to update the state object with
    // in this case, dispatch out to the reducer and send out instructions the following instructions: look for any action with type of string 'SET_CURRENT_USER',to set the payload to the user data coming from google API
    // => this action is then fed back to the userReducer, runs through the switch block, and sets the currentUser with payload (which is set to user data from google API);
    const setCurrentUser = (user) => {
        dispatch({
            type: USER_ACTION_TYPES.SET_CURRENT_USER, 
            payload: user
        });
    };

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

// The useEffect hook is used with an empty dependency array [], which means the effect will run only once when the component mounts.

// Inside the useEffect hook, the onAuthStateChangedListener function is called, passing a callback function that will be executed whenever the authentication state changes (i.e., when a user logs in or out).

// The onAuthStateChangedListener is presumably a function provided by Firebase that sets up a listener to monitor changes in the user's authentication state.

// The provided callback function checks if a user is authenticated (if (user)) and then either creates a new user document in Firebase or signs in the existing user using the createUserDocOrSignInUserFromAuth function.

// The setCurrentUser function is then called to update the currentUser state with the newly authenticated user or null if the user is not authenticated.

// Finally, the unsubscribe function is returned from the useEffect hook. This function is what allows the removal of the listener when the component unmounts.

// When the component is about to unmount (e.g., when the user navigates away from the page or the component is removed from the DOM), React will automatically call the returned unsubscribe function. This function is a cleanup function provided by the useEffect hook, and you can use it to perform cleanup tasks before the component is unmounted.

// In this specific case, the unsubscribe function likely does the job of removing the listener set up by onAuthStateChangedListener. Removing the listener ensures that there are no memory leaks or unnecessary updates happening in the background when the component is no longer in use. This helps with performance and memory management.
};
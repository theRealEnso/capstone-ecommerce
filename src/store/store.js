//boilerplate code required

import {compose, legacy_createStore, applyMiddleware} from 'redux';
// import logger from 'redux-logger';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {rootReducer} from './root-reducer';

//writing our own logger middleware
// 3 functions that return from one another (chained curried functions) => concept of currying functions: currying a function is a function that returns another function
const loggerMiddleware = (store) => (next) => (action) => { // first function receives store object => this in turn returns another function that receives the next method (the thing that allows us to pass on the action) => after, the next function that is returned receives the action. Finally, we write the code that we wan't the middleware to do
    
    if(!action.type){ //if there is no action type, then return from the middleware and do nothing
        return next(action);
    }

    //If there is an action, then do the following:
    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('currentState: ', store.getState()); //getState method just gets us the value of the state at this instance

    next(action); // this next action is being passed to each subsequent middleware and all of the reducers. Once the reducers update, and then update the redux store object afterwards, which in turn calls the useSelectors on all of our components, then the next console log line runs

    console.log('next state: ', store.getState()); // 
}

const persistConfig = { // set up configuration object that tells redux persist what we want
    key: 'root', // root basically says that we want to persist the whole thing. Start from the root level
    storage, // by default, web browsers will use local storage. This is shorthand version where we can cast the variable as the key name, but can also do storage: storage
    blacklist: ['user'] // tells what to blacklist i.e. what we don't want to persist. Pass in array of strings of the reducer values in root reducer => here, we are blacklisting user bc user is being handled by onAuthStateChangedListener. This might conflict and clash with local storage
}

// what is local storage? => this is a property that allows JS sites and apps to save key-value pairs in a web browser with no expiration date. This means that the data stored persists even after the user closes the browser or restarts the computer

const persistedReducer = persistReducer(persistConfig, rootReducer); // create persisted reducer using persistReducer method. Pass in the persistConfig and rootReducer as arguments


const middleWares = [loggerMiddleware]; // middlewares enhance store => they catch actions that have been dispatched before they hit the reducers, and then logs the state

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers); // store will always need rootReducer. legacy_createStore takes 3 parameters

export const persistor = persistStore(store);



//////////  OLD SET UP WITH ROOT REDUCER BEFORE USING PERSISTED REDUCER     /////////////////////////////////////////////

// export const store = legacy_createStore(rootReducer, undefined, composedEnhancers); // store will always need rootReducer. legacy_createStore takes 3 parameters
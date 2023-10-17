//boilerplate code required

import {compose, legacy_createStore, applyMiddleware} from 'redux';
// import logger from 'redux-logger';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { loggerMiddleware } from './middleware/logger';

import {rootReducer} from './root-reducer';

import createSagaMiddleware from 'redux-saga'; // no curly brackets when importing 
import { rootSaga } from './root-saga';
// import thunk from 'redux-thunk'

const persistConfig = { // set up configuration object that tells redux persist what we want
    key: 'root', // root basically says that we want to persist the whole thing. Start from the root level
    storage, // by default, web browsers will use local storage. This is shorthand version where we can cast the variable as the key name, but can also do storage: storage
    blacklist: ['user'] // tells what to blacklist i.e. what we don't want to persist. Pass in array of strings of the reducer values in root reducer => here, we are blacklisting user bc user is being handled by onAuthStateChangedListener. This might conflict and clash with local storage
};

const sagaMiddleware = createSagaMiddleware();

// what is local storage? => this is a property that allows JS sites and apps to save key-value pairs in a web browser with no expiration date. This means that the data stored persists even after the user closes the browser or restarts the computer

const persistedReducer = persistReducer(persistConfig, rootReducer); // create persisted reducer using persistReducer method. Pass in the persistConfig and rootReducer as arguments

// middlewares enhance store => they catch actions that have been dispatched before they hit the reducers, and then logs the state
const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware, sagaMiddleware].filter(Boolean);//filter out anything that is not true / is falsy.
//In other words, if our process environment is in development, then allow loggerMiddleware to function. If it is changed to 'production' then loggerMiddleware will not show

const composeEnhancer = (process.env.NODE_ENV === 'development' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers); // store will always need rootReducer. legacy_createStore takes 3 parameters

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);



//////////  OLD SET UP WITH ROOT REDUCER BEFORE USING PERSISTED REDUCER     /////////////////////////////////////////////

// export const store = legacy_createStore(rootReducer, undefined, composedEnhancers); // store will always need rootReducer. legacy_createStore takes 3 parameters
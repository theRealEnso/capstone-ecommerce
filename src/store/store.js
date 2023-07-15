//boilerplate code required

import {compose, legacy_createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import {rootReducer} from './root-reducer';

//root-reducer 
const middleWares = [logger]; // middlewares enhance store => they catch actions that have been dispatched before they hit the reducers, and then logs the state

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = legacy_createStore(rootReducer, undefined, composedEnhancers); // store will always need rootReducer. legacy_createStore takes 3 parameters
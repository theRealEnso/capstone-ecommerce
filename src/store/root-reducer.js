import {combineReducers} from 'redux';

import {userReducer} from './user/user-reducer.js';
import { categoriesReducer } from './categories/category-reducer.js';

//one reducer for everything
// Whenever rootReducer updates ANY of the reducer values inside, the ENTIRE store object is going to be a NEW store object
//Key takeaway => whenever any action fires and as long as any reducer updates, every single component that has a useSelector will re-run. 

export const rootReducer = combineReducers({
    user: userReducer, // user key set to the entire userReducer
    categories: categoriesReducer
});
import {combineReducers} from 'redux';

import {userReducer} from './user/user-reducer.js';
import { categoriesReducer } from './categories/category-reducer.js';

//one reducer for everything
export const rootReducer = combineReducers({
    user: userReducer, // user key set to the entire userReducer
    categories: categoriesReducer
});
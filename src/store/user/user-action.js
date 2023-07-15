import { createAction } from '../../utilities/reducer.utilities';
import {USER_ACTION_TYPES} from './user-types.js'

//function that receives a user object, then calls the createAction helper function that creates and returns back an object where the TYPE is the user action string, and the payload value is the user object
export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
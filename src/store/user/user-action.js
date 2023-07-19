import { createAction } from '../../utilities/reducer.utilities';
import {USER_ACTION_TYPES} from './user-types.js'

//wrapper function that receives a user object, then calls the createAction helper function (defined to accept two inputs i.e type + payload) which creates and returns back an object where the TYPE is the user action string, and the payload value is the user object
export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user); // we end up using useDispatch from react-redux to dispatch out an action object to update the reducer


// const dispatch = useDispatch();
// dispatch(setCurrentUser(user))

///////////////////////////////

// export const createAction = (type, payload) => ({type, payload});
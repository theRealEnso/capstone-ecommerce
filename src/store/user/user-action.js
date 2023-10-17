import { createAction } from '../../utilities/reducer.utilities'; // export const createAction = (type, payload) => ({type, payload});
import {USER_ACTION_TYPES} from './user-types.js'

//wrapper function that receives a user object, then calls the createAction helper function (defined to accept two inputs i.e type + payload) which creates and returns back an object where the TYPE is the user action string, and the payload value is the user object
export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user); // we end up using useDispatch from react-redux to dispatch out an action object to update the reducer

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION, );

export const signInWithGoogle = () => createAction(USER_ACTION_TYPES.SIGN_IN_WITH_GOOGLE);

export const signInWithEmail = (email, password) => createAction(USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_AND_PASSWORD, {email, password});

export const signInSuccess = (userAuth) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, userAuth);

export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);


// const dispatch = useDispatch();
// dispatch(setCurrentUser(user))



import {USER_ACTION_TYPES} from './user-types.js'

const INITIAL_STATE = {
    currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action; 

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:

            return {
                ...state, 
                currentUser: payload
            }
        default:
            return state; // Actions are passed to every single reducer => every single reducer by default always to return the previous state if none of the cases match the type
    };
};
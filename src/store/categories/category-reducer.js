import { CATEGORIES_ACTION_TYPES } from "./category-types";

//getting general data first, and then use the selector in the selector file to manipulate or transform the data according to needs
export const CATEGORIES_INITIAL_STATE = {
    categories: [],
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return {
                ...state,
                categories: payload
            }
        default:
            return state;
    };
};
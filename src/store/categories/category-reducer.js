import { CATEGORIES_ACTION_TYPES } from "./category-types";

//getting general data first, and then use the selector in the selector file to manipulate or transform the data according to needs
export const CATEGORIES_INITIAL_STATE = {
    categoriesArray: [],
    isLoading: false,
    error: null,
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return {
                ...state,
                isLoading: true
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categoriesArray: payload,
                isLoading: false,
            }
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state;
    };
};
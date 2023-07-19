import { createAction } from "../../utilities/reducer.utilities";
import { CATEGORIES_ACTION_TYPES } from "./category-types";

export const setCategories = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray); //create action object where type is string 'SET_CATEGORIES' and payload value is set to categoriesArray
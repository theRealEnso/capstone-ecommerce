import { createAction } from "../../utilities/reducer.utilities";
import { CATEGORIES_ACTION_TYPES } from "./category-types";

// import { getCategoriesAndDocuments } from "../../utilities/firebase/firebaseUtilities";

export const setCategoriesArray = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray); //create action object where type is string 'SET_CATEGORIES' and payload value is set to categoriesArray

export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);



// //thunk function-- is  a function returning another function that has dispatch
// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//         const categoriesArray = await getCategoriesAndDocuments();
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//         dispatch(fetchCategoriesFailed(error));
//     };
// };
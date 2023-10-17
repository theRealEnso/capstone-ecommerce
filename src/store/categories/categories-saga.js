import {all, call, takeLatest, put} from 'redux-saga/effects';

import { CATEGORIES_ACTION_TYPES } from './category-types';
import { getCategoriesAndDocuments } from "../../utilities/firebase/firebaseUtilities";

import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category-actions';

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments);
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch(error) {
        yield put(fetchCategoriesFailed(error));
    };
};

export function* onFetchCategoriesStart() {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
};

export function* categoriesSaga() {
    yield all([call(onFetchCategoriesStart)]);
};
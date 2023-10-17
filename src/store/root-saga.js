import {all, call} from 'redux-saga/effects';

import { categoriesSaga } from './categories/categories-saga';
//import userSagas

export function* rootSaga() {
    yield all([call(categoriesSaga)]);
};
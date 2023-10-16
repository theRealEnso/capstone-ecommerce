import {all, call} from 'react-saga/effects';

import { categoriesSaga } from './categories/categories-saga';
//import userSagas

export function* rootSaga() {
    yield all([call(categoriesSaga)]);
};
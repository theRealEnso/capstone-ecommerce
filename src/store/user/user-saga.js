import {all, call, put, takeLatest} from 'redux-saga/effects';
import { USER_ACTION_TYPES } from './user-types';

import { createUserDocumentOrSignInUserFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, getCurrentUser } from '../../utilities/firebase/firebaseUtilities';
import {signInSuccess, signInFailed} from './user-action'

export function* getSnapshotFromUserAuth(user, additionalDetails) {
    try {
        const userSnapshot = yield call(createUserDocumentOrSignInUserFromAuth, user, additionalDetails);
        // console.log(userSnapshot); //returns firebase document object
        // console.log(userSnapshot.data()); // nest further in the data function. Need to call this to get actual data we need
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()})); // firebase is weird. ID lives on the document reference object, rest of data lives in .data()
    } catch(error) {
        yield put(signInFailed, error);
    };
};

export function* isSignedIn() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch(error) {
        yield put(signInFailed(error));
    };
};

export function* googleSignIn() {
    try {
        const {user} = yield call(signInWithGooglePopup); // destructure user directly off of the response object we get back from calling signInWithGooglePopup
        // const response = yield call(signInWithGooglePopup);
        // console.log(response);
        // console.log(response.user);
        yield call(getSnapshotFromUserAuth, user);
    } catch(error) {
        yield put(signInFailed, error);
    };
};

export function* emailSignIn({payload: {email, password}}) {
    try {
        const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password); // destructure user directly off of the response object we get back from calling signInAuthUserWithEmailAndPassword
        // const response = yield call(signInAuthUserWithEmailAndPassword, email, password);
        // console.log(response);
        // console.log(response.user);
        yield call(getSnapshotFromUserAuth, user)
    } catch(error) {
        yield put(signInFailed(error));
    };
};

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isSignedIn);
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_IN_WITH_GOOGLE, googleSignIn);
};

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_IN_WITH_EMAIL_AND_PASSWORD, emailSignIn);
};

export function* userSagas() {
    yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart)]);
};
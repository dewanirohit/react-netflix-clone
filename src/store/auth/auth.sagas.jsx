import { takeLatest, all, put, call } from "redux-saga/effects";
import { authActionTypes } from "./auth.types";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDoc } from "firebase/firestore";
import {
	auth,
	createUserProfileDocument,
	getCurrentUser,
} from "../../utils/firebase";
import {
	signInFailure,
	signInSuccess,
	signOutFailure,
	signOutSuccess,
	signUpFailure,
	signUpSuccess,
	finishCheck,
} from "./auth.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(
			createUserProfileDocument,
			userAuth,
			additionalData
		);
		const userSnapshot = yield getDoc(userRef);
		yield put(
			signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
		);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

export function* signIn({ payload: { email, password } }) {
	try {
		const { user } = yield signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		yield getSnapshotFromUserAuth(user);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

export function* checkIfUserIsAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) {
			yield put(finishCheck());
			return;
		}
		yield getSnapshotFromUserAuth(userAuth);
	} catch (e) {
		yield put(signInFailure(e.message));
	}
}

export function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch (e) {
		yield put(signOutFailure(e.message));
	}
}

export function* signUp({ payload: { displayName, email, password } }) {
	try {
		const { user } = yield createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		yield put(signUpSuccess({ user, additionalData: { displayName } }));
	} catch (e) {
		yield put(signUpFailure(e.message));
	}
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
	yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onCheckUserSession() {
	yield takeLatest(
		authActionTypes.START_CHECK_USER_SESSION,
		checkIfUserIsAuthenticated
	);
}

export function* onEmailSignInStart() {
	yield takeLatest(authActionTypes.SIGN_IN_START, signIn);
}

export function* onSignOutStart() {
	yield takeLatest(authActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
	yield takeLatest(authActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(authActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* authSagas() {
	yield all([
		call(onCheckUserSession),
		call(onEmailSignInStart),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}

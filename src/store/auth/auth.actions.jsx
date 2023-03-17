import { authActionTypes } from "./auth.types";

export const startCheckUserSession = () => ({
	type: authActionTypes.START_CHECK_USER_SESSION,
});

export const finishCheck = () => ({
	type: authActionTypes.FINISH_CHECK_USER_SESSION,
});

export const signInStart = (emailAndPassword) => ({
	type: authActionTypes.SIGN_IN_START,
	payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
	type: authActionTypes.SIGN_IN_SUCCESS,
	payload: user,
});

export const signInFailure = (error) => ({
	type: authActionTypes.SIGN_IN_FAILURE,
	payload: error,
});

export const signOutStart = () => ({
	type: authActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
	type: authActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
	type: authActionTypes.SIGN_OUT_FAILURE,
	payload: error,
});

export const signUpStart = (userCredentials) => ({
	type: authActionTypes.SIGN_UP_START,
	payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
	type: authActionTypes.SIGN_UP_SUCCESS,
	payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
	type: authActionTypes.SIGN_UP_FAILURE,
	payload: error,
});

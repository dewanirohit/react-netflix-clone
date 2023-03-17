import { createSelector } from "reselect";

const selectUser = (state) => state.auth;

export const selectCurrentUser = createSelector(
	[selectUser],
	(auth) => auth.currentUser
);

export const selectAuthLoadingState = createSelector(
	[selectUser],
	(auth) => auth.loading
);

export const selectCheckingState = createSelector(
	[selectUser],
	(auth) => auth.checkingUser
);

export const selectAuthErrors = createSelector(
	[selectUser],
	(auth) => auth.error
);

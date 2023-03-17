import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import { useDispatch, useSelector } from "react-redux";
import {
	selectCurrentUser,
	selectAuthLoadingState,
} from "./store/auth/auth.selectors";
import { startCheckUserSession } from "./store/auth/auth.actions";
import { selectSearchResults } from "./store/search/search.selectors";

import Homepage from "./pages/homepage/Homepage";
import Movies from "./pages/movies/Movies";
import TVSeries from "./pages/tvSeries/TVSeries";
import Popular from "./pages/popular/Popular";
import MyList from "./pages/myList/MyList";
import Auth from "./pages/auth/Auth";
import Search from "./pages/search/Search";
import Category from "./pages/category/Category";
import Loading from "./pages/loading/Loading";
import Watch from "./pages/watch/Watch";

function App() {
	const currentUser = useSelector(selectCurrentUser);
	const authLoading = useSelector(selectAuthLoadingState);
	const searchResults = useSelector(selectSearchResults);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startCheckUserSession());
	}, [dispatch]);

	if (authLoading) {
		return <Loading />;
	}

	return (
		<div className="App">
			<AnimatePresence mode="wait">
				<Routes>
					<Route
						exact
						path="/login"
						element={
							currentUser ? (
								<Navigate
									to="/"
									replace
								/>
							) : (
								<Auth />
							)
						}
					/>

					<Route
						exact
						path="/search"
						element={
							currentUser ? (
								searchResults && (
									<Search results={searchResults} />
								)
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						exact
						path="/watch"
						element={
							currentUser ? (
								<Watch />
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						exact
						path="/browse"
						element={
							currentUser ? (
								<Homepage />
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						exact
						path="/browse/:categoryName"
						element={
							currentUser ? (
								<Category type="browse" />
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						exact
						path="/series"
						element={
							currentUser ? (
								<TVSeries />
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						exact
						path="/series/:categoryName"
						element={
							currentUser ? (
								<Category type="series" />
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						exact
						path="/movies"
						element={
							currentUser ? (
								<Movies />
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						exact
						path="/movies/:categoryName"
						element={
							currentUser ? (
								<Category type="movies" />
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						exact
						path="/popular"
						element={
							currentUser ? (
								<Popular />
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						exact
						path="/popular/:categoryName"
						element={
							currentUser ? (
								<Category type="popular" />
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						exact
						path="/my-list"
						element={
							currentUser ? (
								<MyList />
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						exact
						path="/"
						element={
							currentUser ? (
								<Navigate
									to="/browse"
									replace
								/>
							) : (
								<Navigate
									to="/login"
									replace
								/>
							)
						}
					/>

					<Route
						path="*"
						element={
							<Navigate
								to="/"
								replace
							/>
						}
					/>
				</Routes>
			</AnimatePresence>
		</div>
	);
}

export default App;

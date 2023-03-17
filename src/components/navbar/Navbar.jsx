import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";

import { motion } from "framer-motion";
import { navbarFadeInVariants } from "../../utils/motionUtils";

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/auth/auth.selectors";
import { signOutStart } from "../../store/auth/auth.actions";

import Searchbar from "../../components/searchbar/Searchbar";

import useViewport from "../../hooks/useViewport";
import useScroll from "../../hooks/useScroll";
import useOutsideClick from "../../hooks/useOutsideClick";

import logo from "../../assets/img/radflix-logo.png";
import mobileLogo from "../../assets/img/radflix-mobile-logo.png";
import profilePic from "../../assets/img/profile-pic.png";

import "./navbar.scss";

export default function Navbar() {
	const { width } = useViewport();
	const isScrolled = useScroll(70);
	const [genresNav, setGenresNav] = useState(false);
	const [profileNav, setProfileNav] = useState(false);
	const genresNavRef = useRef();
	const profileNavRef = useRef();
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	// useOutsideClick(genresNavRef, () => {
	// 	if (genresNav) setGenresNav(false);
	// });
	// useOutsideClick(profileNavRef, () => {
	// 	if (profileNav) setProfileNav(false);
	// });

	return (
		<>
			<motion.nav
				className={`navbar ${isScrolled && "navbar__fixed"}`}
				variants={navbarFadeInVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				<Link to="/">
					<img
						src={width >= 600 ? logo : mobileLogo}
						alt="logo"
						className="navbar__logo"
					/>
				</Link>

				{width >= 1024 ? (
					<ul className="navbar__primaryNav navbar__navLinks">
						<li className="navbar__navLinks--link">
							<NavLink to="/browse">Home</NavLink>
						</li>
						<li className="navbar__navLinks--link">
							<NavLink to="/series">TV Series</NavLink>
						</li>
						<li className="navbar__navLinks--link">
							<NavLink to="/movies">Movies</NavLink>
						</li>
						<li className="navbar__navLinks--link">
							<NavLink to="/popular">New & Popular</NavLink>
						</li>
						<li className="navbar__navLinks--link">
							<NavLink to="/my-list">My list</NavLink>
						</li>
					</ul>
				) : (
					<div
						className={`navbar__primaryNav navbar__navLinks ${
							isScrolled && "navbar__primaryNav--scrolled"
						}`}
						onClick={() => setGenresNav((prev) => !prev)}
					>
						<span className="navbar__navLinks--link">Discover</span>
						<FaCaretDown className="navbar__primaryNav--toggler navbar__primaryNav--caret" />
						<div
							className={`navbar__primaryNav--content ${
								genresNav ? "active" : ""
							}`}
						>
							{genresNav && (
								<ul
									className="navbar__primaryNav--content-wrp"
									ref={genresNavRef}
								>
									<li className="navbar__navLinks--link">
										<NavLink to="/browse">Home</NavLink>
									</li>
									<li className="navbar__navLinks--link">
										<NavLink to="/series">
											TV Series
										</NavLink>
									</li>
									<li className="navbar__navLinks--link">
										<NavLink to="/movies">Movies</NavLink>
									</li>
									<li className="navbar__navLinks--link">
										<NavLink to="/popular">
											New & Popular
										</NavLink>
									</li>
									<li className="navbar__navLinks--link">
										<NavLink to="/my-list">My list</NavLink>
									</li>
								</ul>
							)}
						</div>
					</div>
				)}
				<div className="navbar__secondaryNav">
					<div className="navbar__navItem">
						<Searchbar />
					</div>

					<div className="navbar__navItem">
						<div
							className={`navbar__navProfile ${
								profileNav && "active"
							}`}
							onClick={() => setProfileNav((prev) => !prev)}
						>
							<img
								src={profilePic}
								alt="profile"
								className="navbar__navProfile--avatar navbar__navProfile--toggler"
							/>

							<FaCaretDown className="navbar__navProfile--toggler navbar__navProfile--caret" />

							<div
								className={`navbar__navProfile--content ${
									profileNav ? "active" : ""
								}`}
							>
								{profileNav && (
									<ul
										className="navbar__navProfile--content-wrp"
										ref={profileNavRef}
									>
										{currentUser && (
											<li
												className="navbar__navLinks--link"
												onClick={() =>
													dispatch(signOutStart())
												}
											>
												Sign out
											</li>
										)}
									</ul>
								)}
							</div>
						</div>
					</div>
				</div>
			</motion.nav>
		</>
	);
}

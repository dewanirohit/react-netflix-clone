import { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectAuthErrors } from "../../store/auth/auth.selectors";

import { motion } from "framer-motion";
import {
	staggerOne,
	authFadeInUpVariants,
	modalVariants,
	authPageFadeInVariants,
} from "../../utils/motionUtils";

import logo from "../../assets/img/radflix-logo.png";
import loginBg from "../../assets/img/login-bg.jpg";

import SignIn from "../../components/signIn/SignIn";
import SignUp from "../../components/signUp/SignUp";

import "./auth.scss";

export default function Auth() {
	const [isSignedUp, setIsSignedUp] = useState(true);
	const authError = useSelector(selectAuthErrors);

	return (
		<motion.div
			className="auth"
			variants={authPageFadeInVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<div className="auth__opacityLayer" />

			<div
				className="auth__bgLayer"
				style={{ backgroundImage: `url(${loginBg})` }}
			/>

			<Link
				className="auth__logo"
				to="/"
			>
				<img
					src={logo}
					alt="logo"
					className="auth__logo--img"
				/>
			</Link>

			<motion.div
				className="auth__content"
				variants={modalVariants}
				initial="hidden"
				animate="visible"
				exit="hidden"
			>
				<motion.div
					variants={staggerOne}
					initial="initial"
					animate="animate"
					exit="exit"
				>
					<motion.h2
						className="auth__content--title"
						variants={authFadeInUpVariants}
					>
						{isSignedUp ? "Sign In" : "Sign Up"}
					</motion.h2>

					{isSignedUp ? <SignIn /> : <SignUp />}

					{authError && (
						<motion.p
							variants={authFadeInUpVariants}
							className="auth__content--error"
						>
							{authError}
						</motion.p>
					)}

					<motion.hr
						variants={authFadeInUpVariants}
						className="auth__content--divider"
					/>

					<motion.small
						variants={authFadeInUpVariants}
						className="auth__content--toggleView"
					>
						{isSignedUp
							? `Haven't registered yet? `
							: "Do you already have an account? "}

						<span
							className="toggler"
							onClick={() => setIsSignedUp((prev) => !prev)}
						>
							{isSignedUp ? "Sign up now." : "Log In"}
						</span>
					</motion.small>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}

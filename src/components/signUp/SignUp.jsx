import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../../store/auth/auth.actions";
import { selectAuthLoadingState } from "../../store/auth/auth.selectors";

import { motion } from "framer-motion";
import { authFadeInUpVariants, staggerOne } from "../../utils/motionUtils";

import InputField from "../inputField/InputField";
import Loader from "../loader/Loader";

import "./signUp.scss";

export default function SignUp() {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectAuthLoadingState);
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const onSubmit = (data) => {
		const { displayName, email, password } = data;
		dispatch(signUpStart({ displayName, email, password }));
	};

	return (
		<motion.form
			className="signUp__form"
			variants={staggerOne}
			initial="initial"
			animate="animate"
			exit="exit"
			onSubmit={handleSubmit(onSubmit)}
		>
			<motion.div
				variants={authFadeInUpVariants}
				className="signUp__form--inputWrp"
			>
				<InputField
					type="text"
					name="displayName"
					placeholder="Your Name"
					validationMessage="Enter your name."
					validation={register("display name", {
						required: true,
						minLength: 3,
						maxLength: 20,
					})}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>

			<motion.div
				variants={authFadeInUpVariants}
				className="signUp__form--inputWrp"
			>
				<InputField
					type="text"
					name="email"
					placeholder="E-mail"
					validationMessage="Enter your email address."
					validation={register("email", {
						required: true,
						pattern:
							/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
					})}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>

			<motion.div
				variants={authFadeInUpVariants}
				className="signUp__form--inputWrp"
			>
				<InputField
					type="password"
					name="password"
					placeholder="Password"
					validationMessage="The password should have a length between 6 and 30 characters."
					validation={register("password", {
						required: true,
						minLength: 6,
						maxLength: 30,
					})}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>

			<motion.div
				variants={authFadeInUpVariants}
				className="signUp__form--inputWrp"
			>
				<InputField
					type="password"
					name="check_password"
					placeholder="Repeat your password"
					validationMessage="Passwords should match"
					validation={register("check password", {
						validate: {
							matchesPreviousPassword: (value) => {
								const { password } = getValues();
								return (
									(value && password === value) ||
									"Passwords should match!"
								);
							},
						},
					})}
					errors={errors}
					disabled={isLoading}
				/>
			</motion.div>

			<motion.button
				type="submit"
				variants={authFadeInUpVariants}
				className={`signUp__form--button button__submit ${
					isLoading && "loading"
				}`}
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : "Sign Up"}
			</motion.button>
		</motion.form>
	);
}

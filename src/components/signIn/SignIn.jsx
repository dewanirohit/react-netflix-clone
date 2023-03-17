import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { selectAuthLoadingState } from "../../store/auth/auth.selectors";
import { signInStart } from "../../store/auth/auth.actions";

import { motion } from "framer-motion";
import { authFadeInUpVariants, staggerOne } from "../../utils/motionUtils";

import InputField from "../inputField/InputField";
import Loader from "../loader/Loader";

import "./signIn.scss";

export default function SignIn() {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectAuthLoadingState);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const onSubmit = (data) => {
		const { email, password } = data;
		dispatch(signInStart({ email, password }));
	};

	return (
		<motion.form
			className="signIn__form"
			variants={staggerOne}
			initial="initial"
			animate="animate"
			exit="exit"
			onSubmit={handleSubmit(onSubmit)}
		>
			<motion.div
				variants={authFadeInUpVariants}
				className="signIn__form--inputWrp"
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
				className="signIn__form--inputWrp"
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

			<motion.button
				type="submit"
				variants={authFadeInUpVariants}
				className={`signIn__form--button button__submit ${
					isLoading && "loading"
				}`}
				disabled={isLoading}
			>
				{isLoading ? <Loader /> : "Sign in"}
			</motion.button>
		</motion.form>
	);
}

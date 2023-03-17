import "./inputField.scss";

const InputField = ({
	type,
	placeholder,
	name,
	additionalClass,
	validationMessage,
	validation,
	errors,
	disabled,
}) => {
	return (
		<>
			<input
				type={type}
				name={name}
				placeholder={placeholder}
				className={`inputField
                    ${errors?.[name] && "input--error"}
                    ${additionalClass && additionalClass}
                `}
				disabled={disabled}
				{...validation}
			/>
			{errors?.[name] && (
				<p className="inputField__label">{validationMessage}</p>
			)}
		</>
	);
};

export default InputField;

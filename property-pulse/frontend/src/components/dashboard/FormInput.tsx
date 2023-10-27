import { HTMLInputTypeAttribute } from "react"

const FormInput = (
	{type, name, defaultValue, placeholder}:
	{type:HTMLInputTypeAttribute, name?:string, defaultValue?:string, placeholder?:string}
) => {
	return (
		<input
			type={type}
			name={name}
			defaultValue={defaultValue}
			placeholder={placeholder}
			className="w-full py-1 px-3 border-solid border-green-900 border-b"
		/>
	);
};

export default FormInput;
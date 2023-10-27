import { HTMLInputTypeAttribute } from "react"

const FormInput = (
	{type, name, defaultValue, placeholder, required}:
	{type:HTMLInputTypeAttribute, name?:string, defaultValue?:string, placeholder?:string, required?:boolean}
) => {
	return (
		<input
			type={type}
			name={name}
			defaultValue={defaultValue}
			placeholder={placeholder}
			className="w-full py-1 px-3 border-solid border-green-900 border-b"
			required={required}
		/>
	);
};

export default FormInput;
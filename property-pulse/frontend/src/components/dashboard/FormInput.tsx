import { ChangeEventHandler, HTMLInputTypeAttribute } from "react"

const FormInput = (
	{type, name, defaultValue, value, placeholder, required, onChange}:
	{type:HTMLInputTypeAttribute, name?:string, defaultValue?:string, value?:string, placeholder?:string, required?:boolean, onChange?:ChangeEventHandler<HTMLInputElement>}
) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			defaultValue={defaultValue}
			placeholder={placeholder}
			className="w-full py-1 px-3 border-solid border-green-900 border-b"
			required={required}
			onChange={onChange}
		/>
	);
};

export default FormInput;
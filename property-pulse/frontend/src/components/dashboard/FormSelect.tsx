import { ChangeEventHandler } from "react";

const FormSelect = (
	{name, defaultValue, value, required, options, onChange}:
	{name?:string, defaultValue?:string, value?:string|number, required?:boolean, options:{value:string, label:string}[], onChange?:ChangeEventHandler<HTMLSelectElement>}
) => {
	return (
		<select name={name} defaultValue={defaultValue} required={required} onChange={onChange} value={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-greeb-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
			{
				options.map(option =>
					<option key={option.value} value={option.value}>{option.label}</option>
				)
			}
		</select>
	);
};

export default FormSelect;
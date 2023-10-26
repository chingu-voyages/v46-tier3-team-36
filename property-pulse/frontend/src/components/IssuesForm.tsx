
const textInputStyles = "border-2 border-red-500";
const btnInputStyles ="mb-4 w-full p-2 bg-green-800 hover:bg-green-600 text-white rounded";
const IssuesForm = () => {
	return(
			<form className="flex flex-col absolute h-1/4 border-2 border-black">
				<input className={textInputStyles} type = "text" />
				<input className={textInputStyles} type = "text" />
				<input className={btnInputStyles} type = "submit" />
			</form>
	)
};
export default IssuesForm;
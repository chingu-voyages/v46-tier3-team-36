
const formStyles = "flex flex-col justify-between absolute h-3/4 m-10 p-2 border-2 rounded-xl shadow-2xl shadow-black border-slate-400 bg-slate-200"
const formSection ="flex flex-col"
const inputStyles = "border-2 border-green-800";
const btnInputStyles ="mb-4 w-full p-2 bg-green-800 hover:bg-green-600 text-white rounded";

const IssuesForm = () => {
	return(
			<form className={formStyles}>
				<section>
					<div className={formSection}>
						<label>Title</label>
						<input className={inputStyles} type = "text" />
					</div>
					<div className={formSection}>
						<label>Choose Type</label>
						<select className="flex flex-col font-medium mt-4 rounded-lg bg-green-900 text-white" >
							<option>Inquiry</option>
							<option>Report</option>
							<option>Request</option>
						</select>
					</div>
				</section>
				<div className={formSection}>
					<label>Details</label>
					<textarea/>
				</div>
				<input className={btnInputStyles} type = "submit" />
			</form>
	)
};
export default IssuesForm;
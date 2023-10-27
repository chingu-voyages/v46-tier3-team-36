
const formStyles = "flex flex-col justify-around absolute md:w-1/3 h-3/4 m-10 p-2 border-2 rounded-xl shadow-xl shadow-slate-600 border-slate-400 bg-slate-100"
const formSection ="flex flex-col"
const inputStyles = "border-2 border-green-800 focus:outline-none focus-visible:border-green-600 rounded-xl p-2";
const btnInputStyles ="mb-4 p-3 bg-green-800 hover:bg-green-600 text-white rounded";
const textAreaStyles = "border-2 border-green-800 focus:outline-none focus-visible:border-green-600 rounded-xl p-2"
const selectStyles ="flex flex-col font-medium mt-4 rounded-lg bg-green-800  text-white p-2";


/* IssuesForm for tenant view allows tenants to create a new issue to send to PMs
Tenant adds <Title> <type> & <Details> manually.
<created by> <timestamp> <edited timestamp> etc... will be added to formdata once "submit btn" is clicked. 
See schema for what keys:value types Issues should have.
*/
const IssuesForm = () => {
	return(
			<form className={formStyles}>			
				<div className={formSection}>
					<label>Title</label>
					<input placeholder="e.g.Broken window" className={inputStyles} type = "text" />
				</div>
				<div className={formSection}>
					<label>Choose Type</label>
					<select className={selectStyles}>
						<option>Inquiry</option>
						<option>Report</option>
						<option>Request</option>
					</select>
				</div>			
				<div className={formSection}>
					<textarea rows={10} placeholder="details"className={textAreaStyles} />
				</div>
				<input className={btnInputStyles} type = "submit" />
			</form>
	)
};
export default IssuesForm;
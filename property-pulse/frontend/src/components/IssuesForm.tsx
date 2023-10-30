'use client';
import {useState} from 'react';
import ErrorDisplay from "./ErrorDisplay";

const formOpened = "flex flex-col justify-around absolute md:w-1/3 h-3/4 m-10 p-2 border-2 rounded-xl shadow-xl shadow-slate-600 border-slate-400 bg-slate-100"
const formClosed ="invisible"
const formSection ="flex flex-col"
const inputStyles = "border-2 border-slate-200 focus:outline-none focus-visible:border-green-600 rounded-xl p-2";
const btnInputStyles ="mb-4 p-3 bg-green-800 hover:bg-green-600 text-white rounded";
const textAreaStyles = "border-2 border-slate-200 focus:outline-none focus-visible:border-green-600 rounded-xl p-2"
const selectStyles ="flex flex-col font-medium mt-4 rounded-lg bg-green-800  text-white p-2";

/*form tenants use to create an issue.
-error component should probably be moved up to page level.
-opening/closing form still needs to be added.
 */
const IssuesForm = ({isOpen}:{isOpen:boolean}) => {
	const [opened, setOpened] = useState(isOpen)
	const [error, setError ] = useState(false);

	const handleSubmit = async (e: { preventDefault: () => void; target: any; }) =>{
		e.preventDefault();
		const form = e.target
		const formData = new FormData(form);
		const newIssue = Object.fromEntries(formData.entries());
		try{
			const response = await fetch('/api/admin/issues',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newIssue)
				// body: throw error
			});
			//may use <data> in future for updating view(Redux) to avoid api call after new issue created...
			const data = await response.json();
		}catch(error){
			console.log(error)
			setError(true)
		}
		form.reset();
	}
	if(error){
		return <ErrorDisplay message="an error occured."/>
	}else{
		return(
			<form className={isOpen ===true ? formOpened : formClosed} onSubmit={handleSubmit}>
				<div className={formSection}>
					<label>Title</label>
					<input name="title" placeholder="e.g.Broken window" className={inputStyles} type = "text" />
				</div>
				<div className={formSection}>
					<label>Choose Type</label>
					<select name="type"className={selectStyles}>
						<option value="inquiry">Inquiry</option>
						<option value="complaint">Report</option>
						<option value="maintenanceRequest">Request</option>
					</select>
				</div>
				<div className={formSection}>
					<textarea rows={10} name="description" placeholder="details" className={textAreaStyles} />
				</div>
				<input className={btnInputStyles} type = "submit" />
			</form>
		)
	}
};
export default IssuesForm;
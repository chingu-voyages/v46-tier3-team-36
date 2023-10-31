'use client';

import {useState} from 'react';
import ErrorDisplay from "../../ErrorDisplay";
import { LegacyRef } from "react";
import { 
	formOpened,
	formClosed,
	formSection,
	inputStyles,
	selectStyles,
	textAreaStyles,
	btnInputStyles 
} from '@/lib/formStyles';

//Form which tenants use within 'Issues view on Dashboard' to send an request to PM.
const IssuesForm = ({isOpen, formRef}:{isOpen:boolean, formRef:LegacyRef<HTMLFormElement>}) => {
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
				//body: someError
			});
			//may use <data> in future for updating view(Redux) to avoid api call after new issue created...
			const data = await response.json();
		}catch(error){
			console.log(error)
			setError(true)
		}
		form.reset();
	};
	//rendering: ErrorDisplay would probably be best invoked at 'page' level.
	if(error){
		return <ErrorDisplay message="an error occured."/>
	}else{
		return(
			<form ref={formRef} className={opened ===true ? formOpened : formClosed} onSubmit={handleSubmit}>
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
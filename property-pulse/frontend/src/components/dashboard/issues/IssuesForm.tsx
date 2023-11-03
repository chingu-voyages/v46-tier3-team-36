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
import { useCreateIssueMutation } from '@/features/issues/tenantIssuesSlice';

//Form which tenants use within 'Issues view on Dashboard' to send an request to PM.
const IssuesForm = ({isOpen, formRef}:{isOpen:boolean, formRef:LegacyRef<HTMLFormElement>}) => {
	const [opened, setOpened] = useState(isOpen)
	const [error, setError ] = useState(false);
	const [ createdIssue ] = useCreateIssueMutation();

	const handleSubmit = async (e: { preventDefault: () => void; target: any; }) =>{
		e.preventDefault();
		const form = e.target
		const formData = new FormData(form);
		const newIssue = Object.fromEntries(formData.entries());
		try{
			await createdIssue(newIssue);

		}catch(error){
			console.log(error)
			setError(true)
		}
		form.reset();
	};
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
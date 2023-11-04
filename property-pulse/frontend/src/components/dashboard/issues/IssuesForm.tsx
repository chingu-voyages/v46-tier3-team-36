'use client';

import {useState} from 'react';
import { LegacyRef } from "react";
import ErrorDisplay from "../../ErrorDisplay";
import { useCreateIssueMutation, useUpdateIssueMutation } from '@/features/issues/tenantIssuesSlice';
import { 
	formOpened,
	formClosed,
	formSection,
	inputStyles,
	selectStyles,
	textAreaStyles,
	btnInputStyles 
} from '@/lib/formStyles';

//Form both creates and edits depending on how it was rendered from Page parent component. 
// <isCreate> boolean prop is used to determine either 'updating' or 'creating' branching within IssuesForm.
const IssuesForm = ({issue, isCreate, isOpen, formRef}:{issue:{id:number,type:string,title:string, description:string},isCreate:boolean, isOpen:boolean, formRef:LegacyRef<HTMLFormElement>}) => {
	const [ opened, setOpened ] = useState(isOpen)
	const [ error, setError ] = useState(false);
	const [ createdIssue ] = useCreateIssueMutation();
	const [ updatedIssue ] = useUpdateIssueMutation();

	const handleSubmit = async (e: { preventDefault: () => void; target: any; }) =>{
		e.preventDefault();
		const form = e.target
		const formData = new FormData(form);
		const newIssue = Object.fromEntries(formData.entries());
		if(isCreate){
			try{
				await createdIssue(newIssue);
			}catch(error){
				console.log(error)
				setError(true)
			}
		}else if(!isCreate){
			const { type, title, description } = newIssue;
			const { id } = issue;
			const editedIssue = {id,type,title,description};
			try{
				await updatedIssue(editedIssue)
			}
			catch(error){
				console.log(error)
				setError(true)
			}
		}
		form.reset();
	};
	//render UI-------------------------------------------------------------------
	if(error){
		return <ErrorDisplay message="an error occured. Refresh browser."/>
	}else{
		return(
			<form ref={formRef} className={opened ===true ? formOpened : formClosed} onSubmit={handleSubmit}>
				<div className={formSection}>
					<label>Title</label>
					{/*Update or Create?*/}
					{!isCreate && <input name="title" placeholder={issue.title} className={inputStyles} type = "text" />}
					{isCreate && <input name="title" placeholder="e.g.Broken window" className={inputStyles} type = "text" />}
				</div>
				<div className={formSection}>
					<label>Choose Type</label>
					<select name="type"className={selectStyles}>
						{/*Update or Create?*/}
						{!isCreate && <option value={issue.type}>{issue.type}</option>}
						<option value="inquiry">Inquiry</option>
						<option value="complaint">Report</option>
						<option value="maintenanceRequest">Request</option>
					</select>
				</div>
				<div className={formSection}>
					{/*Update or Create?*/}
					{!isCreate && <textarea rows={10} name="description" placeholder={issue.description} className={textAreaStyles} />}
					{isCreate && <textarea rows={10} name="description" placeholder="details" className={textAreaStyles} />}
				</div>
				<input className={btnInputStyles} type = "submit" />
			</form>
		)
	}
};
export default IssuesForm;
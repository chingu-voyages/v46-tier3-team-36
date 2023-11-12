'use client';

import {useState,  Dispatch, SetStateAction, LegacyRef} from 'react';
import { toast } from "react-toastify";
import ErrorDisplay from "../../ErrorDisplay";
import LoadingSpinner from '@/components/LoadingSpinner';
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

type IssueFormProps = {
	issue:{
		id:number;
		type:string;
		title:string;
		description:string;
	};
	isCreate:boolean; 
	isOpen:boolean; 
	setIsOpen:Dispatch<SetStateAction<boolean>>;
	formRef:LegacyRef<HTMLFormElement>;
}

//Form both creates and edits depending on how it was rendered from Page parent component. 
// <isCreate> boolean prop is used to determine either 'updating' or 'creating' branching within IssuesForm.
const IssuesForm = ({issue, isCreate, isOpen, setIsOpen, formRef}:IssueFormProps) => {
	const [ error, setError ] = useState(false);
	const [ createdIssue ] = useCreateIssueMutation();
	const [ updatedIssue ] = useUpdateIssueMutation();
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: { preventDefault: () => void; target: any; }) =>{
		e.preventDefault();
		const form = e.target
		const formData = new FormData(form);
		const newIssue = Object.fromEntries(formData.entries());
		if(isCreate){
			try{
				setLoading(true);
				await createdIssue(newIssue);
				toast.success("Issue created.")
			}catch(error){
				console.log(error)
				toast.error("Something went wrong.")
				setError(true)
			}
		}else if(!isCreate){
			const { type, title, description } = newIssue;
			const { id } = issue;
			let editedIssue:Record<string,any> = { id, type, title, description };
			
			try{
				setLoading(true);
				const data = await updatedIssue(editedIssue);
				toast.success("Issue updated.")
			}
			catch(error){
				console.log(error);
				toast.success("Something went wrong.")
			}
		}
		setIsOpen(false);
		setLoading(false);
		form.reset();
	};
	//render UI-------------------------------------------------------------------
	if(error){
		return <ErrorDisplay message="an error occured. Refresh browser."/>
	}else{
		return(
			<form ref={formRef} className={isOpen ===true ? formOpened : formClosed} onSubmit={handleSubmit}>
				<div className={formSection}>
					<label>Title</label>
					{/*Update or Create?*/}
					{!isCreate && <input name="title" defaultValue={issue.title} className={inputStyles} type = "text" />}
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
					{!isCreate && <textarea rows={10} name="description" defaultValue={issue.description} className={textAreaStyles} />}
					{isCreate && <textarea rows={10} name="description" placeholder="details" className={textAreaStyles} />}
				</div>
				<input className={btnInputStyles} type = "submit" />
			{loading && <LoadingSpinner/> }
			</form>
		)
	}
};
export default IssuesForm;
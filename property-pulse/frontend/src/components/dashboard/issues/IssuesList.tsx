'use client'
import DescriptionModal from './DescriptionModal';
import { useDeleteIssueMutation, useUpdateIssueMutation } from '@/features/issues/tenantIssuesSlice';
import {
	listItem, 
	listItemSection, 
	headingStyles, 
	issueTitle, 
	date, 
	buttonBox, 
	editBtn, 
	deleteBtn
} from '@/lib/issuesListStyles';

type Issue ={
	id: number;
	status: string;
	type: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	description: string;
};
type IssuesListProps = {
	issues: Issue[];
	openForm: Function;
};


const IssuesList:React.FC<IssuesListProps> = ({issues, openForm}) => {
	const [ deleteIssue ] = useDeleteIssueMutation();

	const formatTitle= (inquiryType:string)=>{
		/*Makes a more readable title for the UI*/
		const titles:{ [key:string]:string} = {
			inquiry:"Inquiry", 
			complaint:"Complaint", 
			maintenanceRequest:"Request"
		};
		return titles[inquiryType];
	};
	
	const formatDate = ()=>{
		//Tidy up returned date obj.
	};

	const handleDeleteClick = async (id:number) => {
		try{
			await deleteIssue(id).unwrap()
			
		}catch(err){
			console.log(err)
		}
	}

	return(
		<ul>
			{issues.map((item)=>{
				const heading = formatTitle(item.type)
				return(
					 <li className={listItem} key={item.id}>
						<div className={listItemSection}>
							<h1 className={headingStyles}>{heading}</h1>
							<p className="w-1/2">Status:{item.status}</p>
							<ul className="md:w-3/4">
								<li className={issueTitle}>{item.title}</li>
								<li className={date}>Created:{item.createdAt}</li>
								<li className={date}>Updated:{item.updatedAt}</li>
							</ul>							
								<DescriptionModal  description={item.description}/>
						</div>
						<div className={listItemSection}>
							<div className={buttonBox}>
								<button className={editBtn} onClick={()=>openForm(item)}>Edit</button>
								<button className={deleteBtn} onClick={()=>handleDeleteClick(item.id)}>Delete</button>
							</div>
						</div>
					</li>
				)
			})}
		</ul>
	)
};
export default IssuesList;
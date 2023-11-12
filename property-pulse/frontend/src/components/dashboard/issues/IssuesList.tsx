'use client'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { toast } from "react-toastify";
import { selectUser } from '@/features/users/userReducer';
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
	deleteBtn,
	statusStyles
} from '@/lib/issuesListStyles';
import { useUpdateIssueAdminMutation } from '@/features/issues/issuesSlice';

type Issue ={
	id: number;
	status: string;
	tenant:any; //any for now just to get up and running.
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

/*UI version returned depends on if 'role' equals "mangaer" or "tenant". */
const IssuesList:React.FC<IssuesListProps> = ({issues, openForm}) => {
	const [ deleteIssue ] = useDeleteIssueMutation();
	const [ updateIssue ] = useUpdateIssueAdminMutation();
	const user:any = useSelector(selectUser);
	const role = user.role;
	let property ="";
	let unit = 0;


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

	const handleClick = async (item:any) => {
		if(role==="manager"){
			try{
				await updateIssue(item);
				toast.success("Issue status changed.")
				
			}catch(err){
				console.log(err)
			}
		}else if(role==="tenant"){
			try{
				await deleteIssue(item.id).unwrap();
				toast.success("Issue deleted.")
				
			}catch(err){
				toast.error("Something went wrong.")
				console.log(err)
			}
		}else{
			console.log("something wrong in del/update btn click on issue item.")
		}
	}
	return(
		<ul>
			{issues.map((item)=>{
			if(role==="manager"){
				 property = item.tenant.residence[0].property.name;
				 unit = item.tenant.residence[0].id; 
			}
			const heading = formatTitle(item.type)
				return(
					 <li className={listItem} key={item.id}>
						{/*Show property if manager */}
						{role==="manager" && <h1 className="m-2 text-slate-500">{property}unit:{unit}</h1>}
						<div className={listItemSection}>
							<h1 className={headingStyles}>{heading}</h1>
							<p className={statusStyles}>Status:{item.status}</p>
							<ul className="md:w-3/4">
								<li className={issueTitle}>{item.title}</li>
								<li className={date}>Created:{item.createdAt}</li>
								<li className={date}>Updated:{item.updatedAt}</li>
							</ul>							
								<DescriptionModal  id={`modal ${item.id}`} description={item.description}/>
						</div>
						<div className={listItemSection}>
							<div className={buttonBox}>
								{/*Buttons if tenant */}
								{role==="tenant" &&
								<>
								<button className={editBtn} onClick={()=>openForm(item)}>Edit</button>
								<button className={deleteBtn} onClick={()=>handleClick(item)}>Delete</button>
								</>
								}
								{/*Buttons if PM */}
								{role==="manager" && <button className={deleteBtn} onClick={()=>handleClick(item)}>update</button> }
							</div>
						</div>
					</li>
				)
			})}
		</ul>
	)
};
export default IssuesList;
'use client'
import DescriptionModal from './DescriptionModal';
import { 
	useDeleteIssueMutation, 
	useUpdateIssueMutation
} from '@/features/issues/tenantIssuesSlice';
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
};


const IssuesList:React.FC<IssuesListProps> = ({issues}) => {
	const [ deleteIssue ] = useDeleteIssueMutation();
	//updateIssue is set up in RTK and on BE but needs to be
	//implemented in this component OR from the form component 
	const [ updateIssue ] = useUpdateIssueMutation();

	const formatTitle= (inquiryType:string)=>{
		/*Makes a more readable title for the UI*/
		const titles:{ [key:string]:string} = {
			inquiry:"Inquiry", 
			complaint:"Report", 
			maintenanceRequest:"Request"
		};
		return titles[inquiryType];
	};
	const formatDate = ()=>{
		//Tidy up returned date obj.
	};

	const handleDeleteClick = async (id:number) => {
		try{
			console.log(id)
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
							<p>Status:{item.status}</p>
							<ul className="md:w-1/3">
								<li className={issueTitle}>{item.title}</li>
								<li className={date}>Created:{item.createdAt}</li>
								<li className={date}>Updated:{item.updatedAt}</li>
							</ul>							
								<DescriptionModal  description={item.description}/>
						</div>
						<div className={listItemSection}>
							<div className={buttonBox}>
								<button className={editBtn}>Edit</button>
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
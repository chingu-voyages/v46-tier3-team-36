'use client'

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
	/* The 'issueType' names don't correspond to what user selects/sees e.g. 'maintenceRequest vs 'Request'
	formatTitle() turns the issueType back into a more readable title for UI*/
	const formatTitle= (inquiryType:string)=>{
		const titles:{ [key:string]:string} = {
			inquiry:"Inquiry", 
			complaint:"Report", 
			maintenanceRequest:"Request"
		};
		return titles[inquiryType];
	};
	const formatDate = ()=>{
		//tidy up returned date obj.
	};
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
							<div>
								{/*Hovering over 'details' will render a modal displaying text
								to edit user can click edit button (not implemented yet) */}
								<h1>Details</h1>
							</div>
						</div>
						<div className={listItemSection}>
							<div className={buttonBox}>
								<button className={editBtn}>Edit</button>
								<button className={deleteBtn}>Delete</button>
							</div>
						</div>
					</li>
				)
			})}
		</ul>
	)
};
export default IssuesList;
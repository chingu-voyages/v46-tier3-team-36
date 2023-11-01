'use client'

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
//STYLES : move these to lib folder
const listItem = "flex md:flex-row flex-col justify-between shadow-md hover:bg-green-50";
const listItemSection ="flex flex-col gap-5 p-10 items-center w-full md:justify-between xl:flex-row";
const heading = "text-blue-600 text-xl "
const issueTitle = "text-blue-600";
const date ="text-slate-500 text-sm"
const buttonBox = "flex flex-row gap-3 justify-end md:w-full"
const editBtn = "py-1 px-3 rounded-full text-black bg-green-200 hover:bg-green-400 hover:text-white";
const deleteBtn = "py-1 px-3 rounded-full text-white bg-red-300 hover:bg-red-700 hover:text-black";

const IssuesList:React.FC<IssuesListProps> = ({issues}) => {
	return(
		<ul>
			{issues.map((item)=>{
				return(
					 <li className={listItem} key={item.id}>
						<div className={listItemSection}>
							<h1 className={heading}>{item.type}</h1>
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
'use client'

type Issue ={
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
	return(
		<ul>
			{issues.map((item)=>{
				return(
					 <li>
						{item.title}
						{item.type}
						{item.status}
						{item.createdAt}
						{item.updatedAt}
						{item.description}
					</li>
				)
			})}
		</ul>
	)
};
export default IssuesList;
'use client'
import {useState, useRef, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/user/userSlice';
import { useGetIssuesQuery } from '@/features/issues/tenantIssuesSlice';
import IssuesForm from "@/components/dashboard/issues/IssuesForm";
import IssuesList from '@/components/dashboard/issues/IssuesList';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';

const IssuesPage: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isCreate, setIsCreate ] = useState(true);
	const [ issueToEdit, setIssueToEdit ] = useState({id:0,type:"",title:"", description:""});
	const user = useSelector(selectUser);
	const ref = useRef<HTMLFormElement>(null);
	const {data, isLoading, isSuccess}=useGetIssuesQuery(user);

	const openAddForm = () =>{
		if(isOpen === false){
			setIsOpen(true)
		}
		if(isCreate === false){
			setIsCreate(true)
		}
	}
	const openEditForm = (issue:{id:number,type:string,title:string, description:string}) => {
		setIsOpen(true);
		setIsCreate(false);
		setIssueToEdit(issue)
		console.log(issue)
	}

	const closeForm = (e:MouseEvent) =>{
		if (ref.current && !ref.current.contains(e.target as Node)){
			setIsOpen(false)
		}
	};	
	useEffect(() =>{
		document.addEventListener('click', closeForm);
		return () => {
			document.removeEventListener('click', closeForm);
		}
	});
	
	if(isLoading) return <LoadingSpinner/>;
	if(!isSuccess) return <ErrorDisplay message="Data retrieval failed. Please refresh your browser and try again." />;
	return(
		<section>
			<h1>{user && user.name +"'s"} Requests</h1>
			<p></p>
			<button className="bg-green-600 text-white p-2 m-2 rounded-xl" onClick={openAddForm}>New issue</button>
			{isOpen && <IssuesForm issue={issueToEdit} isCreate={isCreate} isOpen={isOpen} formRef={ref}/>}
			<IssuesList openForm={openEditForm} issues={data}/>
		</section>		
	)
}

export default IssuesPage;
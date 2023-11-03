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
	const user = useSelector(selectUser);
	const ref = useRef<HTMLFormElement>(null);
	const {data, isLoading, isSuccess}=useGetIssuesQuery(user);

	const handleClick = () =>{
		if(isOpen === false){
			setIsOpen(true)
		}
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
			<h1>Your Requests</h1>
			<button className="bg-green-600 text-white p-2 m-2 rounded-xl" onClick={handleClick}>New issue</button>
			<IssuesList issues={data}/>
			{isOpen && <IssuesForm isOpen={isOpen} formRef={ref}/>}
		</section>		
	)
}

export default IssuesPage;
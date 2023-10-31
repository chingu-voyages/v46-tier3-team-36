'use client'
import {useState, useRef, useEffect} from 'react';
import IssuesForm from "@/components/dashboard/issues/IssuesForm";
import IssuesList from '@/components/dashboard/issues/IssuesList';
import fakeIssues from '@/components/dashboard/issues/fakeIssueData';

const IssuesPage: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [issues, setIssues] = useState(fakeIssues)
	const ref = useRef<HTMLFormElement>(null);

	const handleClick = () =>{
		if(isOpen === false){
			setIsOpen(true)
		}
	}
	
	//clicking outside of the form closes it.---------------------
	//possibly move this to the layout, making use of Context Provider?
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
	//-------------------------------------------------------------
	return(
		<section>
			<h1>Your Requests</h1>
			<button className="bg-green-600 text-white p-2 m-2 rounded-xl" onClick={handleClick}>New issue</button>
			{/*issues UL will mount here.*/}
			<IssuesList issues={issues}/>
			{isOpen && <IssuesForm isOpen={isOpen} formRef={ref}/>}
		</section>		
	)
}

export default IssuesPage;
'use client'
import {useState, useRef, useEffect} from 'react';
import IssuesForm from "@/components/IssuesForm";

const IssuesPage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef<HTMLFormElement>(null);


	const handleClick = () =>{
		if(isOpen === false){
			setIsOpen(true)
		}
	}

	
	const closeForm = (e:React.MouseEvent<HTMLElement>) =>{
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
	

	return(
		<section>
			<h1>Your Requests</h1>
			<button className="bg-green-600 text-white p-2 m-2 rounded-xl" onClick={handleClick}>New issue</button>
			{isOpen && <IssuesForm isOpen={isOpen} formRef={ref}/>}
		</section>		
	)
}

export default IssuesPage;
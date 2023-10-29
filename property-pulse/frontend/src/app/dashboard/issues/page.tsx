'use client'
import {useState} from 'react';
import IssuesForm from "@/components/IssuesForm";

const IssuesPage = () => {
	const [isOpen, setIsOpen] = useState(false);

	//will change handleClick so it only opens the form and will 
	//add logic so that clicking on <document> !IssuesForm closes form.
	const handleClick = () =>{
		if(isOpen === true){
			setIsOpen(false)
		}else{
			setIsOpen(true)
		}
	}

	return(
		<section>
			<h1>Your Requests</h1>
			<button className="bg-green-600 text-white p-2 m-2 rounded-xl" onClick={handleClick}>New issue</button>
			{isOpen && <IssuesForm isOpen={isOpen}/>}
		</section>		
	)
}

export default IssuesPage;
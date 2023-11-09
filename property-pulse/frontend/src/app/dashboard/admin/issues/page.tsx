'use client'

import { useSelector } from 'react-redux';
import { selectUser } from '@/features/users/userReducer';
import { useGetIssuesQuery } from '@/features/issues/issuesSlice';

import IssuesList from '@/components/dashboard/issues/IssuesList';

const IssueAdminPage = () => {
	const user = useSelector(selectUser);
	const { data, isLoading, isSuccess } =useGetIssuesQuery(user);
	console.log(data)
	console.log(user);
	
	const tempFunc = () => {
	//This is aplace holder for editing function
		console.log("I am a temp func.")
	}

	if(isLoading)return <h1>I am loading</h1>
	if(!isSuccess)return<h1>Failed</h1>
	return (
		<section>
			<h1 className="text-3xl text-green-900 font-bold">Issues</h1>
			<IssuesList openForm={tempFunc}issues={data}/>
		</section>
	)
}

export default IssueAdminPage;
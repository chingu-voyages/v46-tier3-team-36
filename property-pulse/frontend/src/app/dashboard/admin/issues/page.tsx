'use client'

import { useSelector } from 'react-redux';
import { selectUser } from '@/features/users/userReducer';
import { useGetIssuesAdminQuery } from '@/features/issues/issuesSlice';

import IssuesList from '@/components/dashboard/issues/IssuesList';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';

const IssueAdminPage = () => {
	const user = useSelector(selectUser);
	const { data, isLoading, isSuccess } =useGetIssuesAdminQuery(user);
	
	const tempFunc = () => {
	//This is aplace holder for editing function
		console.log("I am a temp func.")
	}

	if(isLoading)return <LoadingSpinner />
	if(!isSuccess)return <ErrorDisplay message={"Data retrieval failed. Please refresh your browser and try again."}/>
	return (
		<section>
			<h1 className="text-3xl text-center text-green-900 font-bold">Issues</h1>
			<IssuesList openForm={tempFunc}issues={data}/>
		</section>
	)
}

export default IssueAdminPage;
import { useGetPaginatedUsersQuery, PaginationOption } from '@/features/users/usersSlice';
import { $Enums } from '../../../../../backend/utils/prisma-proxy';
import User from '@/features/users/userType';
import { useDashboardContext } from '@/app/dashboard/layout'; 
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDeleteUserMutation } from '@/features/users/usersSlice';
import { toast } from "react-toastify";
import { IoMdPersonAdd } from 'react-icons/io';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';
import UserForm from './UserForm';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';

/**
 * List users in a column
 * @param users Array of User objects to display in the list
 * @param userRole The user role for which this list is 
 * @returns
 */
const UserList = ({userRole}:{userRole:$Enums.Role}) => {
	const { showSideMenu } = useDashboardContext();
	const [ userIdEditing, setUserIdEditing ] = useState<number>(0);
	const [ userAdding, setUserAdding ] = useState<boolean>(false);
	const [ page, setPage ] = useState<number>(1);
	const [ perPage, setPerPage ] = useState<number>(5);
	const [ sortBy, setSortBy ] = useState<string>('name');
	const [ search, setSearch ] = useState<string>('');
	const [deleteUser, deleteUserResult] = useDeleteUserMutation();
	const paginationOptions:PaginationOption = {
		role: userRole,
		page: page,
		per_page: perPage,
		sortBy: sortBy,
		search: search
	};
	const {
		data: paginatedUsers,
		isLoading: isUsersLoading,
		isSuccess: isUsersSuccess
	} = useGetPaginatedUsersQuery(paginationOptions);
	const sortableOptions = [
		{value: 'name', label: 'Name'},
		{value: 'email', label: 'Email'}
	];
	const itemsPerPageOptions = [
		{label: '3', value: '3'},
		{label: '5', value: '5'},
		{label: '10', value: '10'},
		{label: '25', value: '25'},
		{label: '50', value: '50'}
	];

	if(isUsersLoading) return <LoadingSpinner />;
	if(!isUsersSuccess) return <ErrorDisplay message="Data retrieval failed. Please refresh your browser and try again." />;

	const onAddClick = (event:React.MouseEvent<SVGElement, MouseEvent>) => {
		setUserAdding(true);
	};
	const onEditClick = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const id:number = Number((event.target as HTMLButtonElement).value);
		setUserIdEditing(id);
	};
	const onDeleteClick = async (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		try {
			if(confirm("Are you sure you want to delete this user?")) {
				const id:number = Number((event.target as HTMLButtonElement).value);
				await deleteUser(id).unwrap();
				toast.success('User successfully deleted', {
					toastId: 'user-delete-success',
					position: toast.POSITION.TOP_CENTER
				});
			}
		} catch(err) {
			toast.error('Error deleting a user', {
				toastId: 'user-delete-error',
				position: toast.POSITION.TOP_CENTER
			});
		}
	};
	const onFilterSortClick = (event:FormEvent) => {
		event.preventDefault();
		const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
		closeEditForm();
		setPage(1);
		setSortBy(String(formData.sort));
		setSearch(String(formData.search));
	};
	const onSearchClear = () => {
		closeEditForm();
		setPage(1);
		setSearch('');
	};
	const onPerPageChange = (event:ChangeEvent<HTMLSelectElement>) => {
		setPerPage(Number(event.target.value));
		setPage(1);
	};
	const onPrevPage = () => {
		if(page > 1) {
			setPage(value => Math.max(1, value - 1));
		}
	};
	const onNextPage = () => {
		if(page < paginatedUsers.total_pages && paginatedUsers.total_pages !== 0) {
			setPage(value => Math.min(paginatedUsers.total_pages, value + 1));
		}
	};
	const closeEditForm = () => {
		setUserIdEditing(0);
	};
	const closeAddForm = () => {
		setUserAdding(false);
	};

	return (
		<div className="w-full flex flex-col gap-5 sm:w-4/5 lg:w-5/6">
			<IoMdPersonAdd onClick={onAddClick} title="Add new user" className="text-3xl text-green-600 hover:text-green-900 hover:cursor-pointer" />
			{userAdding &&
				<UserForm userRole={userRole} formCloseHandler={closeAddForm} />
			}
			<form onSubmit={onFilterSortClick} className="flex flex-row justify-center bg-gray-100 p-5 rounded-xl">
				<div className="flex flex-col gap-10 w-full md:w-2/3 lg:w-1/3">
					<div>
						<label>Search: <FormInput type="text" name="search" placeholder="Enter text to search" /></label>
						{search && <p className="text-green-900 pl-4">Current Search: "{search}"</p>}
					</div>
					<div>
						<label>Sort By: <FormSelect name="sort" options={sortableOptions} /></label>
						{sortBy && <p className="text-green-900 pl-4">Sorted by {sortBy}</p>}
					</div>
					<div className="flex flex-col gap-5">
						<button type="submit" className="py-1 px-3 rounded-full text-black bg-green-400 hover:bg-green-900 hover:text-white">Apply</button>
						<button type="button" onClick={onSearchClear} className="py-1 px-3 rounded-full text-black bg-yellow-400 hover:bg-yellow-700 hover:text-white">Clear Search Filter</button>
					</div>
				</div>
			</form>
			<div className="flex flex-col-reverse justify-between items-center lg:flex-row lg:items-start gap-3">
				<div className="flex flex-row items-center gap-2">
					<div onClick={onPrevPage} className="p-3 border border-solid border-gray-200 hover:cursor-pointer hover:text-green-900">
						<AiOutlineArrowLeft {...page === 1 && {className: 'text-gray-300'}} />
					</div>
					<div onClick={onNextPage} className="p-3 border border-solid border-gray-200 hover:cursor-pointer hover:text-green-900">
						<AiOutlineArrowRight {...(page === paginatedUsers.total_pages || paginatedUsers.total_pages === 0) && {className: 'text-gray-300'}} />
					</div>
					<p>Page {page} of {paginatedUsers.total_pages} ({paginatedUsers.total} total)</p>
				</div>
				<label className="flex flex-row gap-3 items-center">
					# per page:
					<div>
						<FormSelect options={itemsPerPageOptions} value={perPage} onChange={onPerPageChange}/>
					</div>
				</label>
			</div>
			<ul className="flex flex-col gap-3">
				{paginatedUsers.data.map((user:User) => (
					<li key={user.id} className="flex flex-col shadow-md hover:bg-green-50">
						<div className="flex flex-col gap-5 p-10 items-center xl:flex-row">
							<div className={`flex flex-col text-sm gap-9 w-full ${!showSideMenu ? 'lg:flex-row lg:gap-0 lg:justify-between' : 'xl:flex-row xl:justify-start'}`}>
								<div className="flex flex-col items-start xl:gap-2 w-1/4">
									<span className="font-bold text-green-900">Name</span>
									<span>{user.name}</span>
								</div>
								<div className="flex flex-col items-start xl:gap-2 w-1/4">
									<span className="font-bold text-green-900">Email</span>
									<span>{user.email}</span>
								</div>
								{ userRole === $Enums.Role.tenant &&
									<div className="flex flex-col items-start xl:gap-2 w-1/4">
										<span className="font-bold text-green-900">Property</span>
										<span>{user.residence?.name ? user.residence.name : 'None'}</span>
									</div>
								}
								{ userRole === $Enums.Role.tenant &&
									<div className="flex flex-col items-start gap-2 w-1/4">
										<span className="font-bold text-green-900">Unit</span>
										<span>{user.unit?.name ? user.unit.name : 'None'}</span>
									</div>
								}
							</div>
							<div className="flex flex-row gap-3 justify-center w-[200px]">
								{ userIdEditing !== user.id &&
									<button value={user.id} onClick={onEditClick} className="py-1 px-3 rounded-full text-black bg-yellow-400 hover:bg-yellow-600 hover:text-white">Edit</button>
								}
								{ userIdEditing !== user.id &&
									<button value={user.id} onClick={onDeleteClick} className="py-1 px-3 rounded-full text-white bg-red-500 hover:bg-red-800 hover:text-white">Delete</button>
								}
							</div>
						</div>
						{userIdEditing === user.id &&
							<UserForm user={user} userRole={userRole} formCloseHandler={closeEditForm} />
						}
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserList;
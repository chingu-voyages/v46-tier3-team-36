import { User } from '@/features/users/userType';
import { useDashboardContext } from '@/app/dashboard/layout'; 
import { ChangeEvent, useState } from 'react';
import { useDeleteUserMutation } from '@/features/users/usersSlice';
import { toast } from "react-toastify";
import { IoMdPersonAdd } from 'react-icons/io';
import UserForm from './UserForm';
import UserRoles from '@/utils/userRoles';
import FormInput from '../FormInput';
import FormSelect from '../FormSelect';

/**
 * List users in a column
 * @param users Array of User objects to display in the list
 * @param userRole The user role for which this list is 
 * @returns
 */
const UserList = ({users, userRole}:{users:User[], userRole:typeof UserRoles.MANAGER|typeof UserRoles.TENANT}) => {
	const { showSideMenu } = useDashboardContext();
	const [ userIdEditing, setUserIdEditing ] = useState<number>(0);
	const [ sortByField, setSortByField] = useState<string>('name');
	const [ searchString, setSearchString] = useState<string>('');
	const [ userAdding, setUserAdding ] = useState<boolean>(false);
	const [deleteUser, deleteUserResult] = useDeleteUserMutation();
	const searchableFields = ['name', 'email'];
	const sortableOptions = [
		{value: 'name', label: 'Name'},
		{value: 'email', label: 'Email'}
	];

	// Filter and Sort user list
	const filteredUsers = users.filter((user:any) => {
		if(!searchString) return true;
		else {
			let result:boolean = false;
			for(const field of searchableFields) {
				result = result || user[field].toUpperCase().includes(searchString.toUpperCase());
			}
			return result;
		}
	}).toSorted((first:any, second:any) => {
		const firstValue = first[sortByField].toUpperCase();
		const secondValue = second[sortByField].toUpperCase();
		if(firstValue < secondValue) return -1;
		if(firstValue > secondValue) return 1;
		return 0;
	});

	const onAddClick = (event:React.MouseEvent<SVGElement, MouseEvent>) => {
		setUserAdding(true);
	};
	const onEditClick = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const id:number = Number((event.target as HTMLButtonElement).value);
		setUserIdEditing(id);
	};
	const onSearchChange = (event:ChangeEvent<HTMLInputElement>) => {
		setSearchString(event.target.value);
	}
	const onSortChange = (event:ChangeEvent<HTMLSelectElement>) => {
		setSortByField(event.target.value);
	}
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
	const closeEditForm = () => {
		setUserIdEditing(0);
	};
	const closeAddForm = () => {
		setUserAdding(false);
	}

	return (
		<div className="w-full flex flex-col gap-5 sm:w-4/5 lg:w-5/6">
			<IoMdPersonAdd onClick={onAddClick} title="Add new user" className="text-3xl text-green-600 hover:text-green-900 hover:cursor-pointer" />
			{userAdding &&
				<UserForm userRole={userRole} formCloseHandler={closeAddForm} />
			}
			<div className="flex flex-row justify-center bg-green-100 p-5 rounded-xl">
				<div className="flex flex-col gap-10 w-full md:w-2/3 lg:w-1/3">
					<label>Search: <FormInput type="text" placeholder="Enter text to search" onChange={onSearchChange} /></label>
					<label>Sort By: <FormSelect options={sortableOptions} onChange={onSortChange} /></label>
				</div>
			</div>
			<ul className="flex flex-col gap-3">
				{filteredUsers.map((tenant:User) => (
					<li key={tenant.id} className="flex flex-col shadow-md hover:bg-green-50">
						<div className="flex flex-col gap-5 p-10 items-center xl:flex-row">
							<div className={`flex flex-col text-sm gap-9 w-full ${!showSideMenu ? 'lg:flex-row lg:gap-0 lg:justify-between' : 'xl:flex-row xl:justify-start'}`}>
								<div className="flex flex-col items-start xl:gap-2 w-1/4">
									<span className="font-bold text-green-900">Name</span>
									<span>{tenant.name}</span>
								</div>
								<div className="flex flex-col items-start xl:gap-2 w-1/4">
									<span className="font-bold text-green-900">Email</span>
									<span>{tenant.email}</span>
								</div>
								{ userRole === UserRoles.TENANT &&
									<div className="flex flex-col items-start xl:gap-2 w-1/4">
										<span className="font-bold text-green-900">Property</span>
										<span>None</span>
									</div>
								}
								{ userRole === UserRoles.TENANT &&
									<div className="flex flex-col items-start gap-2 w-1/4">
										<span className="font-bold text-green-900">Unit</span>
										<span>None</span>
									</div>
								}
							</div>
							<div className="flex flex-row gap-3 justify-center w-[200px]">
								{ userIdEditing !== tenant.id &&
									<button value={tenant.id} onClick={onEditClick} className="py-1 px-3 rounded-full text-black bg-yellow-400 hover:bg-yellow-600 hover:text-white">Edit</button>
								}
								{ userIdEditing !== tenant.id &&
									<button value={tenant.id} onClick={onDeleteClick} className="py-1 px-3 rounded-full text-white bg-red-500 hover:bg-red-800 hover:text-white">Delete</button>
								}
							</div>
						</div>
						{userIdEditing === tenant.id &&
							<UserForm user={tenant} userRole={userRole} formCloseHandler={closeEditForm} />
						}
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserList;
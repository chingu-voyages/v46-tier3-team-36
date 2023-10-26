'use client'
import { useGetUsersQuery, useDeleteUserMutation } from "@/features/users/usersSlice";
import { FormEvent, useState } from 'react';
import { useDashboardContext } from "../../layout";
import UserRoles from '@/utils/userRoles';
import { User } from "@/features/users/userType";
import { toast } from "react-toastify";

const TenantsPage = () => {
	const [ userIdEditing, setUserIdEditing ] = useState<number>(0);
	const { showSideMenu } = useDashboardContext()
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error
	} = useGetUsersQuery();
	const [deleteUser, result] = useDeleteUserMutation();

	if(!isSuccess) return <section>Loading Data</section>;
	const tenants = users.filter((user:User) => user.role === UserRoles.TENANT);

	const onEditClick = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const id:number = Number((event.target as HTMLButtonElement).value);
		setUserIdEditing(id);
	};
	const onEditCloseClick = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setUserIdEditing(0);
	};
	const onSaveClick = (event:FormEvent) => {
		//const id:number = Number((event.target as HTMLButtonElement).value);
		event.preventDefault();
		console.log(event)
		//setUserIdEditing(0);
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
	
	return (
		<section className="flex flex-col items-center gap-5">
			<h1 className="text-3xl text-green-900 font-bold">Tenants</h1>
			<ul className="flex flex-col gap-3 w-4/5">
				{tenants.map((tenant:User) => (
					<li key={tenant.id} className="flex flex-col shadow-md">
						<div className="flex flex-col gap-5 p-10 items-center hover:bg-green-50 xl:flex-row">
							<div className={`flex flex-col text-sm gap-9 w-full ${!showSideMenu ? 'lg:flex-row lg:gap-0 lg:justify-between' : 'xl:flex-row xl:justify-start'}`}>
								<div className="flex flex-col items-start xl:gap-2 w-1/4">
									<span className="font-bold text-green-900">Name</span>
									<span>{tenant.name}</span>
								</div>
								<div className="flex flex-col items-start xl:gap-2 w-1/4">
									<span className="font-bold text-green-900">Email</span>
									<span>{tenant.email}</span>
								</div>
								<div className="flex flex-col items-start xl:gap-2 w-1/4">
									<span className="font-bold text-green-900">Property</span>
									<span>None</span>
								</div>
								<div className="flex flex-col items-start gap-2 w-1/4">
									<span className="font-bold text-green-900">Unit</span>
									<span>None</span>
								</div>
							</div>
							<div className="flex flex-row gap-3 justify-center w-[200px]">
								{ userIdEditing !== tenant.id &&
									<button value={tenant.id} onClick={onEditClick} className="py-1 px-3 rounded-full text-black bg-yellow-400">Edit</button>
								}
								{ userIdEditing !== tenant.id &&
									<button value={tenant.id} onClick={onDeleteClick} className="py-1 px-3 rounded-full text-white bg-red-500">Delete</button>
								}
							</div>
						</div>
						{userIdEditing === tenant.id &&
							<form className="flex flex-col items-center p-3 gap-5" onSubmit={onSaveClick}>
								<p className="text-lg text-green-900">Edit User: <span className="font-bold">{tenant.name}</span></p>
								<div className="flex flex-col justify-start">
									<label className="flex flex-col">
										Name
										<input type="text" name="name" defaultValue={tenant.name} className="w-1/2"/>
									</label>
									<label className="flex flex-col">
										Email:
										<input type="email" name="email" defaultValue={tenant.email} className="w-1/2"/>
									</label>
									<label className="flex flex-col">
										Role:
										<select name="role" defaultValue={tenant.role} className="w-1/2">
											{Object.values(UserRoles).map(role => (
												<option key={role} value={role}>{role.toUpperCase()}</option>
											))}
										</select>
									</label>
									<label className="flex flex-col">
										Property:
										<input type="text" className="w-1/2"/>
									</label>
									<label className="flex flex-col">
										Unit:
										<input type="text" name="unitId" className="w-1/2"/>
									</label>
								</div>
								<div className="flex flex-row gap-5">
									<button value={tenant.id} onClick={onEditCloseClick} className="py-1 px-3 rounded-full text-black bg-green-400">Close</button>
									<button value={tenant.id} name="id" type="submit" className="py-1 px-3 rounded-full text-black bg-yellow-400">Save</button>
								</div>
							</form>
						}
					</li>
				))}
			</ul>
		</section>
	);
}

export default TenantsPage;
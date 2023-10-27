import { User } from '@/features/users/userType';
import { toast } from "react-toastify";
import { FormEvent } from 'react';
import { useUpdateUserMutation, useCreateUserMutation } from '@/features/users/usersSlice';
import FormInput from '../FormInput';
import UserRoles from '@/utils/userRoles';

/**
 * User Form for create or update. If user is set, then it's an edit. Otherwise, it's an addition.
 * @param user User object if this form is for editing. Undefined for add form.
 * @param userRole the role of the new user or the existing user
 * @returns
 */
const UserForm = (
	{user, userRole, formCloseHandler}:
	{user?:User, userRole:typeof UserRoles.MANAGER|typeof UserRoles.TENANT, formCloseHandler:()=>void}
) => {
	const [updateUser, updateUserResult] = useUpdateUserMutation();
	const [createUser, createUserResult] = useCreateUserMutation();
	
	const onFormSubmit = async (event:FormEvent) => {
		try {
			event.preventDefault();
			const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
			const userData = {
				id: user ? Number(user.id) : undefined,
				email: String(formData.email),
				name: String(formData.name),
				password: !user ? String(formData.password) : undefined,
				role: userRole
			} as User;
			if(user) {
				await updateUser(userData).unwrap();
				toast.success('User successfully updated', {
					toastId: 'user-update-success',
					position: toast.POSITION.TOP_CENTER
				});
			} else {
				if(String(formData.password) !== String(formData.passwordconfirm)) {
					toast.error('Passwords do not match', {
						toastId: 'password-validate-error',
						position: toast.POSITION.TOP_CENTER
					});
					return false;
				}
				await createUser(userData).unwrap();
				toast.success('User successfully created', {
					toastId: 'user-create-success',
					position: toast.POSITION.TOP_CENTER
				});
			}
			formCloseHandler();
		} catch(err) {
			// Later, display a more specific message
			toast.error('Error updating a user', {
				toastId: 'user-update-error',
				position: toast.POSITION.TOP_CENTER
			});
		}
	};

	return (
		<form className="flex flex-col items-center p-3 gap-5" onSubmit={onFormSubmit}>
			<p className="text-lg text-green-900">{user ? 'Edit User:' : 'Add User'} <span className="font-bold">{user?.name}</span></p>
			<div className="flex flex-col justify-start gap-3">
				<label className="flex flex-col">
					Name
					<FormInput type="text" name="name" defaultValue={user?.name} placeholder="First Last" required />
				</label>
				<label className="flex flex-col">
					Email
					<FormInput type="email" name="email" defaultValue={user?.email} required />
				</label>
				{ !user &&
					<label className="flex flex-col">
						Password
						<FormInput type="password" name="password" required />
					</label>
				}
				{ !user &&
					<label className="flex flex-col">
						Password Confirm
						<FormInput type="password" name="passwordconfirm" required />
					</label>
				}
				{ userRole === UserRoles.TENANT &&
					<label className="flex flex-col">
						Property
						<FormInput type="text" />
					</label>
				}
				{ userRole === UserRoles.TENANT &&
					<label className="flex flex-col">
						Unit
						<FormInput type="text" name="unitId" />
					</label>
				}
			</div>
			<div className="flex flex-row gap-5">
				<button type="button" onClick={formCloseHandler} className="py-1 px-3 rounded-full text-black bg-green-400 hover:bg-green-900 hover:text-white">Close</button>
				<button type="submit" className="py-1 px-3 rounded-full text-black bg-yellow-400 hover:bg-yellow-600 hover:text-white">Save</button>
			</div>
		</form>
	);
};

export default UserForm;
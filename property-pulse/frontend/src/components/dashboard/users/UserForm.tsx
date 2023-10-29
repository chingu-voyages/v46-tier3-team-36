import { $Enums } from '../../../../../backend/utils/prisma-proxy';
import { useGetPropertiesQuery } from '@/features/properties/propertiesSlice';
import { useGetUnitsForPropertyQuery } from '@/features/units/unitsSlice';
import User from '@/features/users/userType';
import { toast } from "react-toastify";
import { ChangeEvent, FormEvent, useState } from 'react';
import { useUpdateUserMutation, useCreateUserMutation } from '@/features/users/usersSlice';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';
import FormSelect from '../FormSelect';
import FormInput from '../FormInput';

/**
 * User Form for create or update. If user is set, then it's an edit. Otherwise, it's an addition.
 * @param user User object if this form is for editing. Undefined for add form.
 * @param userRole the role of the new user or the existing user
 * @returns
 */
const UserForm = (
	{user, userRole, formCloseHandler}:
	{user?:User, userRole:$Enums.Role, formCloseHandler:()=>void}
) => {
	const [updateUser, updateUserResult] = useUpdateUserMutation();
	const [createUser, createUserResult] = useCreateUserMutation();
	const [resetPassword, setResetPassword] = useState<boolean>(false);
	const [selectedPropertyId, setSelectedPropertyId] = useState<number|undefined>(user?.residence[0]?.propertyId);
	const [selectedUnitId, setSelectedUnitId] = useState<number|undefined>(user?.residence[0]?.id);
	const {
		data: properties,
		isLoading: isPropertiesLoading,
		isSuccess: isPropertiesSuccess
	} = useGetPropertiesQuery();
	const {
		data: units = []
	} = useGetUnitsForPropertyQuery(selectedPropertyId || 0);

	if(isPropertiesLoading) return <LoadingSpinner />;
	if(!isPropertiesSuccess) return <ErrorDisplay message="Data retrieval failed. Please refresh your browser and try again." />;

	const propertiesOptions = properties.map(property => {
		return { value: property.id, label: property.name };
	});

	const unitOptions = units.map(unit => {
		return { value: unit.id, label: unit.name };
	});

	const onPasswordResetChange = (event:ChangeEvent<HTMLInputElement>) => {
		setResetPassword(event.target.checked);
	};
	const onPropertyChanged = (event:ChangeEvent<HTMLSelectElement>) => {
		setSelectedPropertyId(Number(event.target.value));
	};
	const onUnitChanged = (event:ChangeEvent<HTMLSelectElement>) => {
		setSelectedUnitId(Number(event.target.value));
	};
	const onFormSubmit = async (event:FormEvent) => {
		try {
			event.preventDefault();
			const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());
			if(!user || resetPassword) {
				if(String(formData.password) !== String(formData.passwordconfirm)) {
					toast.error('Passwords do not match', {
						toastId: 'password-validate-error',
						position: toast.POSITION.TOP_CENTER
					});
					return false;
				}
			}
			const userData = {
				id: user ? Number(user.id) : undefined,
				email: String(formData.email),
				name: String(formData.name),
				password: !user || resetPassword ? String(formData.password) : undefined,
				role: userRole,
				residence: units.filter(unit => unit.id === Number(formData.unitId))
				//residenceId: userRole === $Enums.Role.tenant ? Number(formData.residenceId) : undefined,
				//unitId: userRole === $Enums.Role.tenant ? selectedUnitId : undefined
			} as User;
			if(user) {
				await updateUser(userData).unwrap();
				toast.success('User successfully updated', {
					toastId: 'user-update-success',
					position: toast.POSITION.TOP_CENTER
				});
			} else {
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
			return false;
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
				{ user &&
					<label><input type="checkbox" onChange={onPasswordResetChange} /> Reset Password</label>
				}
				{ (!user || resetPassword) &&
					<label className="flex flex-col">
						Password
						<FormInput type="password" name="password" required />
					</label>
				}
				{ (!user || resetPassword) &&
					<label className="flex flex-col">
						Password Confirm
						<FormInput type="password" name="passwordconfirm" required />
					</label>
				}
				{ userRole === $Enums.Role.tenant &&
					<label className="flex flex-col">
						Property
						<FormSelect options={propertiesOptions} noneSelect={true} defaultValue={user?.residence[0]?.id} onChange={onPropertyChanged} />
					</label>
				}
				{ userRole === $Enums.Role.tenant &&
					<label className="flex flex-col">
						Unit
						<FormSelect options={unitOptions} name="unitId" noneSelect={true} value={selectedUnitId} onChange={onUnitChanged} />
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
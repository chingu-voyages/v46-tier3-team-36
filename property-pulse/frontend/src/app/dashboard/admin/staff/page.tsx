'use client'
import { useGetUsersQuery } from "@/features/users/usersSlice";
import UserList from "@/components/dashboard/users/UserList";
import { User } from "@/features/users/userType";
import UserRoles from "@/utils/userRoles";

const StaffPage = () => {
	const {
		data: users,
		isLoading,
		isSuccess,
		isError,
		error
	} = useGetUsersQuery();

	if(!isSuccess) return <section>Loading Data</section>;

	// Filter to have all tenant role users and sort by their name
	const managers = users.filter((user:User) => user.role === UserRoles.MANAGER);

	return (
		<section className="flex flex-col items-center gap-5">
			<h1 className="text-3xl text-green-900 font-bold">Staff</h1>
			<UserList users={managers} userRole={UserRoles.MANAGER} />
		</section>
	);
}

export default StaffPage;
'use client'
import UserList from "@/components/dashboard/users/UserList";
import UserRoles from "@/utils/userRoles";

const StaffPage = () => {
	return (
		<section className="flex flex-col items-center gap-5">
			<h1 className="text-3xl text-green-900 font-bold">Staff</h1>
			<UserList userRole={UserRoles.MANAGER} />
		</section>
	);
}

export default StaffPage;
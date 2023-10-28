'use client'
import UserList from "@/components/dashboard/users/UserList";
import { $Enums } from "../../../../../../backend/utils/prisma-proxy";

const StaffPage = () => {
	return (
		<section className="flex flex-col items-center gap-5">
			<h1 className="text-3xl text-green-900 font-bold">Staff</h1>
			<UserList userRole={$Enums.Role.manager} />
		</section>
	);
}

export default StaffPage;
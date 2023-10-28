'use client'
import UserList from "@/components/dashboard/users/UserList";
import UserRoles from "@/utils/userRoles";

const TenantsPage = () => {
	return (
		<section className="flex flex-col items-center gap-5">
			<h1 className="text-3xl text-green-900 font-bold">Tenants</h1>
			<UserList userRole={UserRoles.TENANT} />
		</section>
	);
}

export default TenantsPage;
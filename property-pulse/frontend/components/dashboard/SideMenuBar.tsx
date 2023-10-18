import { useDashboardContext } from "@/app/dashboard/layout";
import { ManagerMenuItems, TenantMenuItems } from "@/app/dashboard/menuItems";

const SideMenuBar = () => {
	const { user, showSideMenu, setShowSideMenu } = useDashboardContext();
	return (
		<aside className={`fixed left-0 bottom-0 top-16 bg-gray-50 hidden md:flex flex-col justify-center items-center ${showSideMenu ? 'w-72': 'w-0 overflow-hidden'}`}>
			<ul>
				{user.role === 'manager' && ManagerMenuItems.map((item) => (
					<li key={item.path}>{item.label}</li>
				))}
				{user.role === 'tenant' && TenantMenuItems.map((item) => (
					<li key={item.path}>{item.label}</li>
				))}
			</ul>
		</aside>
	);
};

export default SideMenuBar;
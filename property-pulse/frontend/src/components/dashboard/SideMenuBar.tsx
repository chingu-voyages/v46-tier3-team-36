import { useDashboardContext } from "@/app/dashboard/layout";
import { ManagerMenuItems, TenantMenuItems } from "@/utils/menuItems";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import Link from "next/link";
import Logo from "../Logo";
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/user/userSlice';

const SideMenuBar = () => {
	const user = useSelector(selectUser);
	const { showSideMenu, setShowSideMenu, setActiveRoute, activeRoute } = useDashboardContext();
	const onLinkClick = (event:React.MouseEvent<HTMLElement>) => {
		const newRouteName = (event.target as HTMLElement).closest('a')?.dataset.route as string || '';
		setActiveRoute(newRouteName);
	};
	const toggleSideMenu = () => { setShowSideMenu((value) => !value); }
	return (
		<aside className={`fixed transition-[width] left-0 bottom-0 top-0 bg-green-900 hidden md:grid grid-rows-min justify-center text-white ${showSideMenu ? 'w-72': 'w-0 overflow-hidden'}`}>
			<div className="row-span-1 pt-4 bg-white h-16 w-full px-6">
				<Logo  />
			</div>
			<ul className="row-span-2 flex flex-col text-lg" onClick={onLinkClick}>
				<li>
					<Link href="/dashboard"
						{...activeRoute === ''
							? {className: "bg-green-600 pl-5 py-2 block"}
							: {className: "hover:bg-green-700 pl-5 py-2 block"}
						}
					>Home</Link>
				</li>
				{user?.role === 'manager' && ManagerMenuItems.map((item) => (
					<li key={item.path}>
						<Link data-route={item.path} href={`/dashboard${item.path}`}
							{
								...activeRoute === item.path
								? {className: "bg-green-600 pl-5 py-2 block"}
								: {className: "hover:bg-green-700 pl-5 py-2 block"}
							}
						>{item.label}</Link>
					</li>
				))}
				{user?.role === 'tenant' && TenantMenuItems.map((item) => (
					<li key={item.path}>
						<Link data-route={item.path} href={`/dashboard${item.path}`}
							{
								...activeRoute === item.path
								? {className: "bg-green-600 pl-5 py-2 block"}
								: {className: "hover:bg-green-700 pl-5 py-2 block"}
							}
						>{item.label}</Link>
					</li>
				))}
			</ul>
			<div onClick={toggleSideMenu} className={`transition-[left] fixed top-2/4 bg-green-900 py-7 px-[2px] rounded-tr-[8px] rounded-br-[8px] hover:cursor-pointer hover:bg-green-700 ${showSideMenu ? 'left-72' : 'left-0'}`}>
				{showSideMenu && <AiFillCaretLeft />}
				{!showSideMenu && <AiFillCaretRight />}
			</div>
		</aside>
	);
};

export default SideMenuBar;
import { useDashboardContext } from "@/app/dashboard/layout";
import { UserIcon } from '@heroicons/react/24/solid';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import Logo from '../Logo';
import DropdownMenuList from "./DropdownMenuList";
import { ManagerMenuItems, TenantMenuItems, UserMenuItems } from "@/app/dashboard/menuItems";

const Navbar = () => {
	const { user, setActiveRoute, showUserMenu, setShowUserMenu, showHamburgerMenu, setShowHamburgerMenu } = useDashboardContext();
	const onHamburgerClick = () => { setShowHamburgerMenu((value:boolean) => {return !value;}); };
	const onUserBtnClick = () => { setShowUserMenu((value:boolean) => {return !value;}); };
	const onLinkClick = (event:React.MouseEvent<HTMLElement>) => {
		const newRouteName = (event.target as HTMLElement).closest('a')?.dataset.route as string || 'dashboard';
		setActiveRoute(newRouteName);
		setShowHamburgerMenu(false);
		setShowUserMenu(false);
	}

	return (
		<nav className="border-gray-200 bg-gray-50 fixed w-full">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<div className="items-center md:hidden">
					<button type="button" onClick={onHamburgerClick} className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
						<span className="sr-only">Open main menu</span>
						<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
						</svg>
					</button>
				</div>
				<Logo />
				<div className="flex-wrap items-center hidden gap-8 md:flex">
					<div className="relative">
						<BellAlertIcon className="h-8 w-8 text-green-700 hover:cursor-pointer hover:text-green-900"/>
					</div>
					<div className="relative">
						<a onClick={onUserBtnClick} className="flex items-center justify-center gap-1 text-white bg-green-700 rounded-full px-4 py-1 hover:cursor-pointer hover:bg-green-900">
							<UserIcon className="h-5 w-5" />
							{user.firstName} {user.lastName}
							<ChevronUpDownIcon className="h-5 w-5" />
						</a>
						<div className={`w-48 absolute right-1 top-10 ${showUserMenu ? '' : 'hidden'}`}>
							<DropdownMenuList menuItems={UserMenuItems} onClick={onLinkClick} />
						</div>
					</div>
				</div>
				<div className={`w-full md:hidden ${showHamburgerMenu ? '' : 'hidden'}`}>
					{user.role === 'manager' && <DropdownMenuList menuItems={UserMenuItems.concat(ManagerMenuItems)} includeHomeLink={true} onClick={onLinkClick} />}
					{user.role === 'tenant' && <DropdownMenuList menuItems={UserMenuItems.concat(TenantMenuItems)} includeHomeLink={true} onClick={onLinkClick} />}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
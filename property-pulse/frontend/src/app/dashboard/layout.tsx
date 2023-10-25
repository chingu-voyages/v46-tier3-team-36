'use client'
import { useState, useContext, createContext, useEffect, useRef } from 'react';
import { usePathname} from 'next/navigation';
import Navbar from '@/components/dashboard/Navbar';
import SideMenuBar from '@/components/dashboard/SideMenuBar';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/user/userSlice';

interface Context {
	activeRoute: string;
	setActiveRoute: React.Dispatch<React.SetStateAction<string>>;
	showUserMenu: boolean;
	setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
	showHamburgerMenu: boolean;
	setShowHamburgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
	showSideMenu: boolean;
	setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
	logout: () => void;
}

// Add any states that children of the Dashboard may require
const DashboardContext = createContext<Context>({} as Context);

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
	const pathname = usePathname();
	const [activeRoute, setActiveRoute] = useState<string>((pathname.substring('/dashboard'.length)));
	const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
	const [showHamburgerMenu, setShowHamburgerMenu] = useState<boolean>(false);
	const [showSideMenu, setShowSideMenu] = useState<boolean>(true);
	const profileBtnRef = useRef<HTMLAnchorElement>(null);
	const hamburgerRef = useRef<HTMLButtonElement>(null);
	const router = useRouter();
	const user = useSelector(selectUser);

	const logout = () => {
		// Delete auth token before taking user to the app landing page
		toast.success('You have been logged out.', {
			toastId: 'logout-success',
			position: toast.POSITION.TOP_CENTER
		});
		router.push('/');
	};

	// When clicking outside the dropdown menu, close any open dropdown menus
	const closeDropdownMenus = (event:React.MouseEvent<HTMLElement>) => {
		const targetElement = event.target;
		if(profileBtnRef?.current && !profileBtnRef.current.contains(targetElement as Node)) {
			setShowUserMenu(false);
		}
		if(hamburgerRef?.current && !hamburgerRef.current.contains(targetElement as Node)) {
			setShowHamburgerMenu(false);
		}
	}

	useEffect(() => {
		if(!user) {
			toast.error('Please login.', {
				toastId: 'auth-error',
				position: toast.POSITION.TOP_CENTER
			});
			router.push('/login');
		}
	}, [user])

	const contextValue = {
		activeRoute: activeRoute,
		setActiveRoute: setActiveRoute,
		showUserMenu: showUserMenu,
		setShowUserMenu: setShowUserMenu,
		showHamburgerMenu: showHamburgerMenu,
		setShowHamburgerMenu: setShowHamburgerMenu,
		showSideMenu: showSideMenu,
		setShowSideMenu: setShowSideMenu,
		logout: logout
	};

	return (
		<DashboardContext.Provider value={contextValue}>
			<main onClick={closeDropdownMenus}>
				<Navbar profileBtnRef={profileBtnRef} hamburgerRef={hamburgerRef} />
				<SideMenuBar />
				<div className={`p-4 pt-20 min-h-screen ${showSideMenu ? 'md:ml-80' : 'ml-5'}`}>
					{children}
				</div>
			</main>
		</DashboardContext.Provider>
	)
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
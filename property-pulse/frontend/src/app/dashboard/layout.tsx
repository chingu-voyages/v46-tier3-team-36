'use client'
import { useState, useContext, createContext, useEffect, useRef } from 'react';
import { usePathname} from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/user/userSlice';
import { userLoggedIn } from '@/features/user/userSlice';
import { useAppDispatch } from '@/store/store';
import Navbar from '@/components/dashboard/Navbar';
import SideMenuBar from '@/components/dashboard/SideMenuBar';

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
	const dispatch = useAppDispatch();
	const [activeRoute, setActiveRoute] = useState<string>((pathname.substring('/dashboard'.length)));
	const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
	const [showHamburgerMenu, setShowHamburgerMenu] = useState<boolean>(false);
	const [showSideMenu, setShowSideMenu] = useState<boolean>(true);
	const profileBtnRef = useRef<HTMLAnchorElement>(null);
	const hamburgerRef = useRef<HTMLButtonElement>(null);
	const router = useRouter();
	const user = useSelector(selectUser);

	const logout = async () => {
		try {
			await fetch('/api/auth/logout', { method: 'POST' });
			localStorage.removeItem('login');
			toast.success('You have been logged out.', {
				toastId: 'logout-success',
				position: toast.POSITION.TOP_CENTER
			});
		} catch(err) {
			// May display an error toast later
		}
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
		try {
			// If user does not exist in the Redux store, check in the local storage.
			if(!user) {
				const userData = localStorage.getItem('login');
				if(userData) {
					// Login state found in local storage.
					const loggedInuser = JSON.parse(localStorage.getItem('login') || '');
					dispatch(userLoggedIn(loggedInuser));
				} else {
					// Login state does not exist in the local storage either. User must log on.
					toast.error('Please login.', {
						toastId: 'auth-error',
						position: toast.POSITION.TOP_CENTER
					});
					router.push('/login');
				}
			}
		} catch(err) {
			dispatch(userLoggedIn(null));
			localStorage.removeItem('login');
		}
	}, []);

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
'use client'
import { useState, useEffect, useContext, createContext} from 'react';
import { usePathname} from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/dashboard/Navbar';
import SideMenuBar from '@/components/dashboard/SideMenuBar';

type User = {
	userid: number;
	username: string;
	firstName: string;
	lastName: string;
	role: string;
}

type Context = {
	user: User;
	activeRoute: string;
	setActiveRoute: React.Dispatch<React.SetStateAction<string>>;
	showUserMenu: boolean;
	setShowUserMenu: React.Dispatch<React.SetStateAction<boolean>>;
	showHamburgerMenu: boolean;
	setShowHamburgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
	showSideMenu: boolean;
	setShowSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

// Add any states that children of the Dashboard may require
const DashboardContext = createContext<Context>({} as Context);

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
	const pathname = usePathname();
	const [activeRoute, setActiveRoute] = useState<string>((pathname.substring('/dashboard'.length)));
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
	const [showHamburgerMenu, setShowHamburgerMenu] = useState<boolean>(false);
	const [showSideMenu, setShowSideMenu] = useState<boolean>(true);
	
	useEffect(() => {
		try {
			const fetchUser = async () => {
				const response = await axios.get('/fakedata/user.json');
				setUser(response.data);
				setLoading(false);
			};
			fetchUser();
		} catch(err) {
			// User is either not logged on or failed to get current user. Redirect to the login page
			console.log(err);
		}
	}, []);

	// Put something better for JSX later
	if(isLoading) return <p>Loading user data</p>;
	if(!user) return <p>No user data</p>

	const contextValue = {
		user: user,
		activeRoute: activeRoute,
		setActiveRoute: setActiveRoute,
		showUserMenu: showUserMenu,
		setShowUserMenu: setShowUserMenu,
		showHamburgerMenu: showHamburgerMenu,
		setShowHamburgerMenu: setShowHamburgerMenu,
		showSideMenu: showSideMenu,
		setShowSideMenu: setShowSideMenu
	};

	return (
		<DashboardContext.Provider value={contextValue}>
			<Navbar/>
			<SideMenuBar />
			<main className={`p-4 pt-20 ${showSideMenu ? 'md:ml-72' : 'ml-5'}`}>
				{children}
			</main>
		</DashboardContext.Provider>
	)
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
import { useDashboardContext } from "@/app/dashboard/layout";
import Link from 'next/link';

type MenuItem = {
	path: string;
	label: string;
}[];

const DropdownMenuList = (
	{menuItems, includeHomeLink = false, onClick}
	:{menuItems:MenuItem, includeHomeLink?:boolean, onClick:React.MouseEventHandler<HTMLElement>}
) => {
	const { activeRoute, logout } = useDashboardContext();
	return (
		<ul className="flex flex-col font-medium mt-4 rounded-lg bg-green-900 text-white" onClick={onClick}>
			{includeHomeLink &&
				<li>
					<Link href="/dashboard" className={`block py-2 pl-3 pr-4 ${activeRoute === '' ? 'bg-green-600 rounded' : 'rounded hover:bg-green-700'}`}>Home</Link>
				</li>
			}
			{menuItems.map((item) => (
				<li key={item.path}>
					<Link href={`/dashboard${item.path}`} data-route={item.path} className={`block py-2 pl-3 pr-4 ${activeRoute === item.path ? 'bg-green-600 rounded' : 'rounded hover:bg-green-700'}`}>
						{item.label}
					</Link>
				</li>
			))}
			<li>
				<a onClick={logout} className="block py-2 pl-3 pr-4 rounded hover:bg-green-700 hover:cursor-pointer">Logout</a>
			</li>
		</ul>
	);
};

export default DropdownMenuList;
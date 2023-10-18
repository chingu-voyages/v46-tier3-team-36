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
	const { activeRoute } = useDashboardContext();

	return (
		<ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-200" onClick={onClick}>
			{includeHomeLink &&
				<li>
					<a href="/dashboard" className={`block py-2 pl-3 pr-4 ${activeRoute === 'dashboard' ? 'text-white bg-green-700 rounded' : 'text-gray-900 rounded hover:bg-gray-100'}`}>Home</a>
				</li>
			}
			{menuItems.map((item) => (
				<li key={item.path}>
					<Link href={`/dashboard/${item.path}`} data-route={item.path} className={`block py-2 pl-3 pr-4 ${activeRoute === item.path ? 'text-white bg-green-700 rounded' : 'text-gray-900 rounded hover:bg-gray-100'}`}>
						{item.label}
					</Link>
				</li>
			))}
			<li>
				<a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100">Logout</a>
			</li>
		</ul>
	);
};

export default DropdownMenuList;
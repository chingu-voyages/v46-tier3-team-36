'use client'

import { useDashboardContext } from "../layout";

/**
 * Check if user is a manager before allowing access to any routes in admin.
 * @param param0 children routes
 * @returns JSX
 */
const AdminLayout = ({children}: {children: React.ReactNode}) => {
	const { user } = useDashboardContext();
	if(user && user.role === 'manager')
		return <>{children}</>;
	else
		return <p>You are not authorized to view this section.</p>;
};

export default AdminLayout;
'use client'

import { useSelector } from 'react-redux';
import { selectUser } from '@/features/users/userReducer';
import { $Enums } from '../../../../../backend/utils/prisma-proxy';
import LoadingSpinner from '@/components/LoadingSpinner';
/**
 * Check if user is a manager before allowing access to any routes in admin.
 * @param param0 children routes
 * @returns JSX
 */
const AdminLayout = ({children}: {children: React.ReactNode}) => {
	const user = useSelector(selectUser);
	if(!user) return <LoadingSpinner />
	if(user.role === $Enums.Role.manager)
		return <>{children}</>;
	else
		return <p>You are not authorized to view this section.</p>;
};

export default AdminLayout;
import { $Enums, PrismaClient, User } from '@prisma/client';
import { Request } from 'express';

const prisma = new PrismaClient();

const updateMyProfile = async (req:Request, data:User) => {
	const user = prisma.user.update({
		data: {
			email: data.email,
			name: data.name,
			...data.password && { password: data.password }
		},
		where: { id: req.user?.id }
	});
	return user;
};

const updateRole = async (req:Request, role:$Enums.Role) => {
	const user = prisma.user.update({
		data: {
			role: role
		},
		where: { id: req.user?.id }
	});
	return user;
};

export default { updateMyProfile, updateRole };
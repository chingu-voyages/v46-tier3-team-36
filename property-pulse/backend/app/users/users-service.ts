import { $Enums, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (id: number) => {
	return await prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			residenceId: true,
			unitId: true
		}
	});
};

const getAllUsers = async () => {
	return await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			residenceId: true,
			unitId: true
		}
	});
};

const getPaginatedUsers = async (role:$Enums.Role, page: number, per_page: number) => {
	const users = await prisma.user.findMany({
		skip: (page - 1) * per_page,
		take: per_page,
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			residenceId: true,
			unitId: true
		},
		where: {
			role
		}
	});
	const count = await prisma.user.count({
		where: {
			role
		}
	});
	const result = {
		role: role,
		page: page,
		per_page: per_page,
		total: count,
		total_pages: Math.ceil(count / per_page),
		data: users
	}
	return result;
}

const createUser = async (data:User) => {
	const newUser = await prisma.user.create({data});
	return newUser;
};

const updateUser = async (id:number, data:User) => {
	const updatedUser = await prisma.user.update({
		where: { id },
		data: {
			name: data.name,
			email: data.email,
			role: data.role,
		}
	});
	return updatedUser;
};

const deleteUser = async (id:number) => {
	const deletedUser = await prisma.user.delete({
		where: {id}
	});
	return deletedUser;
}

export default { getUser, getAllUsers, getPaginatedUsers, createUser, updateUser, deleteUser };
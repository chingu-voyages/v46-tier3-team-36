import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const getUser = async (id: number) => {
	return await prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			email: true,
			role: true
		}
	});
};

const getAllUsers = async () => {
	return await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			role: true
		}
	});
};

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

export default { getUser, getAllUsers, createUser, updateUser, deleteUser };
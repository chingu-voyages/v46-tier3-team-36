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
			residence: true,
			unit: true
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
			residence: true,
			unit: true
		}
	});
};

const getPaginatedUsers = async (role:$Enums.Role, page: number, per_page: number, sortby = 'name', search?:string) => {
	let condition:Object = {role};
	// Apply search string filter to the query condition.
	if(search) {
		condition = {
			role,
			OR: [
				{ name: {contains: search, mode: 'insensitive'} },
				{ email: {contains: search, mode: 'insensitive'} },
				{ 
					residence: { name: {contains: search, mode: 'insensitive'} }
				},
				{
					unit: { name: {contains: search, mode: 'insensitive'} }
				}
			]
		};
	}
	// Get paginated users
	const users = await prisma.user.findMany({
		skip: (page - 1) * per_page,
		take: per_page,
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			residence: true,
			unit: true
		},
		where: condition,
		orderBy: [{
			[sortby]: 'asc'
		},{
			id: 'asc'
		}]
	});
	// Get total number of users
	const count = await prisma.user.count({
		where: condition
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
	// Do not take any id given by the client. Let prisma auto-generate.
	const newUser = await prisma.user.create({
		data: {
			name: data.name,
			email: data.email,
			role: data.role,
			residenceId: data.residenceId,
			unitId: data.unitId,
			password: data.password
		}
	});
	return newUser;
};

const updateUser = async (id:number, data:User) => {
	const updatedUser = await prisma.user.update({
		where: { id },
		data: {
			name: data.name,
			email: data.email,
			role: data.role,
			residenceId: data.residenceId,
			unitId: data.unitId,
			...data.password && {password: data.password}
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
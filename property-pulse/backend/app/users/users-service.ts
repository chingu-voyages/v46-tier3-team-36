import { $Enums, PrismaClient, User, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Build Include Unit object that includes property
const unitProperty: Prisma.UnitInclude = {
	property: true
};

const userWithResidence = Prisma.validator<Prisma.UserDefaultArgs> () ({
	include: { residence: true, properties: true }
});

type UserWithResidence = Prisma.UserGetPayload<typeof userWithResidence>

const getUser = async (id: number) => {
	return await prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			residence: true
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
			residence: {
				include: unitProperty
			}
		}
	});
};

const getPaginatedUsers = async (userId:number, role:$Enums.Role, page: number, per_page: number, sortby = 'name', search?:string) => {
	const loggedInUser = await prisma.user.findUnique({
		where: {id: userId},
		select: {
			properties: true
		}
	});

	let condition:Object = {
		role,
		OR: [{
			residence: {
				some: {
					propertyId: {
						in: loggedInUser?.properties?.map(property => property.id)
					}
				}
			}
		},{
			residence: { none: {} }
		}]
	};

	// Apply search string filter to the query condition.
	if(search) {
		condition = {
			role,
			AND: [{
				OR: [{
					residence: {
						some: {
							propertyId: {
								in: loggedInUser?.properties?.map(property => property.id)
							}
						}
					}
				},{
					residence: { none: {} }
				}]
			},{
				OR: [
					{ name: {contains: search, mode: 'insensitive'} },
					{ email: {contains: search, mode: 'insensitive'} },
					{ 
						residence: {
							some: {
								name: {contains: search, mode: 'insensitive'}
							}
						}
					},
					{
						residence: {
							some: {
								property: {
									name: {contains: search, mode: 'insensitive'}
								}
							}
						}
					}
				]
			}]
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
			residence: {
				include: unitProperty
			}
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

const createUser = async (data:UserWithResidence) => {
	// Do not take any id given by the client. Let prisma auto-generate.
	const newUser = await prisma.user.create({
		data: {
			name: data.name,
			email: data.email,
			role: data.role,
			residence: {
				connect: data.residence
			},
			password: data.password
		}
	});
	return newUser;
};

const updateUser = async (id:number, data:UserWithResidence) => {
	const updatedUser = await prisma.user.update({
		where: { id },
		data: {
			name: data.name,
			email: data.email,
			role: data.role,
			residence: {
				set: data.residence
			},
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
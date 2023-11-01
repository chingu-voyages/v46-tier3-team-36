import { PrismaClient, Issue } from '@prisma/client';

const prisma = new PrismaClient();

const getAllIssues = async (user) => {
	console.log(user)
}

export default getAllIssues;
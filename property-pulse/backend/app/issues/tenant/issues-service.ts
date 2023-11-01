import { PrismaClient, Issue } from '@prisma/client';

const prisma = new PrismaClient();

const getAllIssues = async (user) => {
	return await prisma.issue.findMany({
		where:{tenantId:user.id}
	})
}

export default {getAllIssues};
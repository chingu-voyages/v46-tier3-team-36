import { PrismaClient, Issue } from '@prisma/client';

const prisma = new PrismaClient();

const createIssue = async (user, issue:Issue) => {
	const {type, unitId=null, title, description} = issue;
	const createdIssue = await prisma.issue.create({
		data: {
			type,
			tenantId: user.id,
			unitId,
			title,
			description
		}
	})
	console.log(createdIssue)
	return createdIssue;
}

const getAllIssues = async (user) => {
	return await prisma.issue.findMany({
		where:{tenantId:user.id}
	})
}

export default {createIssue, getAllIssues};
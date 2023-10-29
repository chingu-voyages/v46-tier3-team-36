import { PrismaClient, Issue } from '@prisma/client';

const prisma = new PrismaClient();

const createIssue = async (user, issue: Issue) => {
  const { type, title, description } = issue;

  const createdIssue = await prisma.issue.create({
    data: {
      type,
      tenantId: user.id,
      title,
      description
    }
  })

  console.log(createdIssue)
  return createdIssue;
}

const getIssue = async (issueId: number) => {
  return await prisma.issue.findUnique({
    where: {
      id: issueId
    }
  })
}

// find all issues where tenant is a resident of one of the user's properties
const getAllIssues = async (user) => {
  return await prisma.issue.findMany({
    where: {
      tenant: {
        residence: {
          ownerId: user.id
        }
      }
    }
  })
}

const updateIssue = async (issueId: number, data: Issue) => {
  const { type, title, description } = data;

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issueId
    },
    data: {
      type,
      title,
      description
    }
  })

  return updatedIssue;
}

const deleteIssue = async (issueId: number) => {
  const deletedIssue = await prisma.issue.delete({
    where: {
      id: issueId
    }
  })

  return deletedIssue;
}

export default { createIssue, getIssue, getAllIssues, updateIssue, deleteIssue };
import { PrismaClient, Issue } from '@prisma/client';

const prisma = new PrismaClient();

const createIssue = async (user, issue: Issue) => {
  const { type, unitId=null, title, description } = issue;

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
    include: {
      tenant: {
        include: {
          residence: {
            include: {
              property: true
            }
          }
        }
      }
    },
    where: {
      tenant: {
        residence: {
          some: {
            property: {
              ownerId: user.id
            }
          }
        }
      }
    }
  })
}


const updateIssue = async (issueId: number, data: Issue) => {
  let { status } = data;
  status === 'open' ? status = "closed" : status = "open"
  
  const updatedIssue = await prisma.issue.update({
    where: {
      id: issueId
    },
    data: {
      status
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
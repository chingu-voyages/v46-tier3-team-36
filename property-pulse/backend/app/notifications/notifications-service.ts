import { PrismaClient, Notification } from '@prisma/client';

const prisma = new PrismaClient();

const createNotification = async (loggedInUser, notification: Notification) => {
  const { title, content, userId } = notification;

  // const findRecipient = await prisma.user.findUnique({
    
  // })

  const createdNotification = await prisma.notification.create({
    data: {
      title,
      content,
      user: {
        connect: {
          id: userId // recipient
        }
      }
    }
  })

  console.log(createdNotification)
  return createdNotification;
}

const getNotification = async (issueId: number) => {
  return await prisma.issue.findUnique({
    where: {
      id: issueId
    }
  })
}

// find all issues where tenant is a resident of one of the user's properties
const getAllNotifications = async (user) => {
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

export default { createNotification, getNotification, getAllNotifications };
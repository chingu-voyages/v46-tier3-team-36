import { PrismaClient, Notification } from '@prisma/client';

const prisma = new PrismaClient();

const createNotification = async (loggedInUser, notification: Notification) => {
  const { title, content, userId } = notification;

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

const getNotification = async (notificationId: number) => {
  return await prisma.notification.findUnique({
    where: {
      id: notificationId
    }
  })
}

// find all notifications for logged in user
const getAllNotifications = async (user) => {
  return await prisma.notification.findMany({
    where: {
      userId: user.id
    }
  })
}

export default { createNotification, getNotification, getAllNotifications };
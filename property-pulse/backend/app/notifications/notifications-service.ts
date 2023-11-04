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

const getNewNotifications = (req, res) => {
  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  
  const sendNotifications = async () => {
    const user = req.user;
    
    console.log('test')
    const newNotifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
        isNew: true,
      },
      orderBy: { createdAt: 'asc' },
    });
    console.log(newNotifications)
    if (newNotifications.length > 0) {
      res.write(`data: ${JSON.stringify(newNotifications)}\n\n`);
    }
  };
  
  // Send notifications every 5 seconds
  const intervalId = setInterval(sendNotifications, 5000);
  
  // Handle client disconnect -- for some reason this runs immediately and 
  // sendNotifications is never called
  // req.on('close', () => {
  //   console.log('Client disconnected');
  //   clearInterval(intervalId);
  //   res.end();
  // });
};

export default { createNotification, getNotification, getAllNotifications, getNewNotifications };
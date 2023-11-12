import { PrismaClient, Notification } from '@prisma/client';
import { NotFoundError } from '../../middleware/errorMiddleware';

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

const getNotification = async (notificationId: number): Promise<Notification> => {
  const notification = await prisma.notification.findUnique({
    where: {
      id: notificationId
    }
  })

  if (!notification) {
    throw new NotFoundError('Notification not found');
  }

  // set read to true after reading notification
  await prisma.notification.update({
    where: { 
      id: notification.id 
    },
    data: {
      read: true
    }
  })

  return notification;
}

// find all notifications for logged in user
const getAllNotifications = async (user) => {
  return await prisma.notification.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { createdAt: 'desc' },
  })
}

const getUnreadNotifications = async (user) => {
  return await prisma.notification.findMany({
    where: {
      userId: user.id,
      read: false,
      isNew: false // to avoid double counting when notifications arrive while SSE not active?
    },
    orderBy: { createdAt: 'desc' },
  })
}

const deleteNotification = async (notificationId) => {
  const deletedNotification = await prisma.notification.delete({
    where: {
      id: notificationId
    }
  })
}

const getNewNotifications = (req, res) => {
  // SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // setInterval(() => {
  //   res.write('data: ' + 'test2' + '\n\n')
  // }, 1000)

  const sendNotifications = async () => {
    const user = req.user;
    
    const newNotifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
        isNew: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log(newNotifications)

    if (newNotifications.length > 0) {
      res.write(`event: update\n`);
      res.write(`data: ${JSON.stringify(newNotifications)}\n\n`);
      console.log('test')

      // set isNew to false after sending to client
      await prisma.notification.updateMany({
        where: { 
          id: { 
            in: newNotifications.map((notification) => notification.id) 
          } 
        },
        data: { isNew: false },
      })
    } else {
      console.log('no notifications')
    }

  };
  
  // check for notifications every 100 seconds = 100000 ms
  // shorten as needed, just setting this as the default so that if someone forgets
  // to shutdown the server, we won't go over the Supabase free tier as easily
  const notificationsInterval = setInterval(sendNotifications, 1000);
  
  req.on('close', () => {
    console.log('Client disconnected');
    clearInterval(notificationsInterval);
    res.end();
  });

};

export default { 
  createNotification, 
  getNotification, 
  getAllNotifications, 
  getNewNotifications, 
  getUnreadNotifications,
  deleteNotification
};
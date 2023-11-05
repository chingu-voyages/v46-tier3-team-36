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
      orderBy: { createdAt: 'asc' },
    });
    console.log(newNotifications)

    if (newNotifications.length > 0) {
      res.write(`event: update\n`);
      res.write(`data: ${JSON.stringify(newNotifications)}\n\n`);
      console.log('test')

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
  
  // check for notifications every 100 seconds
  // shorten as needed, just setting this as the default so that if someone forgets
  // to shutdown the server, we won't go over the Supabase free tier as easily
  const notificationsInterval = setInterval(sendNotifications, 100000);
  
  req.on('close', () => {
    console.log('Client disconnected');
    clearInterval(notificationsInterval);
    res.end();
  });

};

export default { createNotification, getNotification, getAllNotifications, getNewNotifications };
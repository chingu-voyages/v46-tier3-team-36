import notificationsService from './notifications-service';
import express from 'express';

const router = express.Router();

router
	/**
	 * Create a new notification
	 */
  .post('/api/users/:userId/notifications', async (req, res) => {
    const loggedInUser = req.user;
    const newNotification = await notificationsService.createNotification(loggedInUser, req.body);

    return res.status(201).json(newNotification);
  })

  /**
	 * Get a single notification by the given id
	 */
  .get('/api/users/:userId/notifications/:id([0-9]+)', async (req, res) => {
    const user = req.user;
    const notification = await notificationsService.getNotification(Number(req.params.id))
    
    return res.status(200).json(notification)
  })

  /**
	 * Get all notifications for the logged in user
	 */
  .get('/api/users/:userId/notifications', async (req, res) => {
    const user = req.user;
    const notifications = await notificationsService.getAllNotifications(user)
    
    return res.status(200).json(notifications)
  })
  
    /**
	 * Get new notifications for the logged in user
	 */
    .get('/api/users/:userId/notifications/new', async (req, res) => {
      const notifications = await notificationsService.getNewNotifications(req, res)
      
      return res.status(200).json(notifications)
    })

export default router;
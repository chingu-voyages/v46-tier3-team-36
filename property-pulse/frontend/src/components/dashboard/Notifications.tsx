import React, { useEffect, useState } from 'react';
import { Notification } from '../../../../backend/utils/prisma-proxy';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/users/userReducer';

const Notifications = () => {
  const [newNotifications, setNewNotifications] = useState<Notification[]>([]);
  // TODO: fetch unread count to initialize newNotificationsCount state
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const user = useSelector(selectUser);

  useEffect(() => {
    const eventSource = new EventSource(`/api/users/${user?.id}/notifications/new`);

    eventSource.onopen = (event) => {
      console.log('Connection opened', event);
    };

    // eventSource.onmessage = (event) => {
    //   console.log(event)
    // }
    
    eventSource.addEventListener('update', (event) => {
      console.log(eventSource, 'event listener')
      const notifications = JSON.parse(event.data);
      setNewNotifications((newNotifications: Notification[]) => [notifications, ...newNotifications]);
      setNewNotificationsCount((count) => count + notifications.length);
    })

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };
    
    return () => {
      eventSource.close();
    };
  }, []);
  console.log(newNotifications)
  return (
    <div>
      {newNotificationsCount > 0 && (
        <span className="">{newNotificationsCount}</span>
        )}
    </div>
  );
};

export default Notifications;

// eventSource.onmessage = (event) => {
//   console.log('on message')
//   console.log(event)
//   const notifications = JSON.parse(event.data);
//   setNewNotifications((newNotifications: Notification[]) => [notifications, ...newNotifications]);
//   setNewNotificationsCount((count) => count + 1);
//   console.log(newNotifications)
// };
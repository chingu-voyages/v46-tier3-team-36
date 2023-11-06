import React, { useEffect, useState } from 'react';
import { Notification } from '../../../../backend/utils/prisma-proxy';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/users/userReducer';
import { useGetUnreadNotificationsQuery } from '@/features/notifications/notificationsSlice';

const Notifications = () => {
  const { data } = useGetUnreadNotificationsQuery()
  const [newNotifications, setNewNotifications] = useState<Notification[]>(data || []);
  // fetch unread count to initialize newNotificationsCount state
  // why doesn't this work? newNotificationsCount undefined
  const [newNotificationsCount, setNewNotificationsCount] = useState(data?.length);
  const user = useSelector(selectUser);

  console.log(data?.length, newNotificationsCount)

  useEffect(() => {
    const eventSource = new EventSource(`/api/users/${user?.id}/notifications/new`);

    eventSource.onopen = (event) => {
      console.log('Connection opened', event);
    };
    
    eventSource.addEventListener('update', (event) => {
      console.log(eventSource, 'event listener');
      const notifications = JSON.parse(event.data);
      setNewNotifications((newNotifications: Notification[]) => [notifications, ...newNotifications]);
      setNewNotificationsCount((count) => count + notifications.length);
    })

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      // eventSource.close();
    };
    
    return () => {
      eventSource.close();
    };
  }, []);
  console.log(newNotifications);
  return (
    <div>
      {newNotificationsCount && (
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
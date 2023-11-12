import React, { useEffect, useState } from 'react';
import { Notification } from '../../../../backend/utils/prisma-proxy';
import { useSelector } from 'react-redux';
import { selectUser } from '@/features/users/userReducer';
import { useGetUnreadNotificationsQuery } from '@/features/notifications/notificationsSlice';

const Notifications = () => {
  const user = useSelector(selectUser);
  const { data, isLoading, isSuccess } = useGetUnreadNotificationsQuery();

  const [newNotifications, setNewNotifications] = useState<Notification[]>([]);
  const [newNotificationsCount, setNewNotificationsCount] = useState<number | null>(null);

  useEffect(() => {
    if (isSuccess) {
      setNewNotifications(data || []);
      setNewNotificationsCount(data?.length);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    // user is showing up as undefined sometimes?
    const eventSource = new EventSource(`/api/users/${user?.id}/notifications/new`);

    eventSource.onopen = (event) => {
      console.log('Connection opened', event);
    };

    eventSource.addEventListener('update', (event) => {
      console.log(eventSource, 'event listener');
      const notifications = JSON.parse(event.data);
      setNewNotifications((newNotifications: Notification[]) => [notifications, ...newNotifications]);
      setNewNotificationsCount((count) => count + notifications.length);
    });

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
      {newNotificationsCount !== null && (
        <span className="">{newNotificationsCount}</span>
      )}
    </div>
  );
};

export default Notifications;

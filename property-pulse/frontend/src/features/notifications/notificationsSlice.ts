import { apiSlice } from '../api/apiSlice';
import { Notification } from '../../../../backend/utils/prisma-proxy';

export const notificationsApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getNotifications: builder.query<Notification[], void>({
			query: () => '/users/:userId/notifications',
			providesTags: ['Notifications']
		}),
    getUnreadNotifications: builder.query<Notification[], void>({
			query: () => '/users/:userId/notifications/unread',
			providesTags: ['Notifications']
		}),
		createNotification: builder.mutation<Notification, Notification>({
			query: notification => ({
				url: '/users/:userId/notifications',
				method: 'POST',
				body: notification
			}),
			invalidatesTags: ['Notifications']
		}),
		// updateNotification: builder.mutation<Notification, Notification>({
		// 	query: notification => ({
		// 		url: `/admin/notifications/${notification.id}`,
		// 		method: 'PATCH',
		// 		body: notification
		// 	}),
		// 	invalidatesTags: ['Notifications']
		// }),
		deleteNotification: builder.mutation<Notification, number>({
			query: notificationId => ({
				url: `/users/:userId/notifications${notificationId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Notifications']
		})
	})
});

export const {
	useGetNotificationsQuery,
  useGetUnreadNotificationsQuery,
	useCreateNotificationMutation,
	// useUpdateNotificationMutation,
	useDeleteNotificationMutation
} = notificationsApiSlice;
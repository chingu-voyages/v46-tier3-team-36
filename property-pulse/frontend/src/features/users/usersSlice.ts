import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { apiSlice } from '../api/apiSlice';
import { User } from './userType';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getUsers: builder.query<User[], void>({
			query: () => '/admin/users',
			providesTags: ['Users']
		}),
		createUser: builder.mutation<User, User>({
			query: user => ({
				url: '/admin/users',
				method: 'POST',
				body: user
			}),
			invalidatesTags: ['Users']
		}),
		updateUser: builder.mutation<User, User>({
			query: user => ({
				url: `/admin/users/${user.id}`,
				method: 'PATCH',
				body: user
			}),
			invalidatesTags: ['Users']
		}),
		deleteUser: builder.mutation<User, User>({
			query: userId => ({
				url: `/admin/users/${userId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Users']
		})
	})
});

export const {
	useGetUsersQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation
} = usersApiSlice;
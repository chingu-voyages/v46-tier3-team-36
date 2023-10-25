import { apiSlice } from '../api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getUsers: builder.query({
			query: () => '/users',
			providesTags: ['Users']
		}),
		createUser: builder.mutation({
			query: user => ({
				url: '/users/create',
				method: 'POST',
				body: user
			}),
			invalidatesTags: ['Users']
		}),
		updateUser: builder.mutation({
			query: user => ({
				url: `/users/update/${user.id}`,
				method: 'PATCH',
				body: user
			}),
			invalidatesTags: ['Users']
		}),
		deleteUser: builder.mutation({
			query: userId => ({
				url: `/users/delete/${userId}`,
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
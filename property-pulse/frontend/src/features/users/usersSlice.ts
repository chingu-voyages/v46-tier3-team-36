import { apiSlice } from '../api/apiSlice';
import { User } from './userType';

interface PaginatedUsers<T> {
	role: string;
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: T[];
};

interface PaginationOption {
	role: string;
	page: number;
	per_page: number;
	sortBy?: string;
	search?: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getPaginatedUsers: builder.query<PaginatedUsers<User>, PaginationOption> ({
			query: (paginationOptions:PaginationOption) => {
				return {
					url: `/admin/users/${paginationOptions.role}/${paginationOptions.per_page}/${paginationOptions.page}`,
					method: 'GET',
					body: {
						sortBy: paginationOptions.sortBy,
						search: paginationOptions.search
					}
				};
			},
			providesTags: ['Users']
		}),
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
		deleteUser: builder.mutation<User, number>({
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
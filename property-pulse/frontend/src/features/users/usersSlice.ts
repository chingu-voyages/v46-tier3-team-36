import { apiSlice } from '../api/apiSlice';
import { User }  from '../../../../backend/utils/prisma-proxy';

export interface PaginatedUsers<T> {
	role: string;
	page: number;
	per_page: number;
	total: number;
	total_pages: number;
	data: T[];
};

export interface PaginationOption {
	role: string;
	page: number;
	per_page: number;
	sortBy: string;
	search?: string;
}

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getPaginatedUsers: builder.query<PaginatedUsers<User>, PaginationOption> ({
			query: (op:PaginationOption) => {
				let url = `/admin/users/${op.role}/${op.per_page}/${op.page}?sortby=${op.sortBy}`;
				if(op.search) url += `&search=${op.search}`;
				return url;
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
	useGetPaginatedUsersQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation
} = usersApiSlice;
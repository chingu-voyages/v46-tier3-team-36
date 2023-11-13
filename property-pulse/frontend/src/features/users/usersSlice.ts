import { apiSlice } from '../api/apiSlice';
import { User, UserWithResidence } from './userType';

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
};

export interface UserLogin {
	email: string;
	password: string;
};

interface UserResponse {
	user: UserWithResidence;
};

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		loginUser: builder.mutation<UserResponse, UserLogin> ({
			query: userLogin => ({
				url: '/auth/login',
				method: 'POST',
				body: userLogin
			})
		}),
		getPaginatedUsers: builder.query<PaginatedUsers<UserWithResidence>, PaginationOption> ({
			query: (op:PaginationOption) => {
				let url = `/admin/users/${op.role}/${op.per_page}/${op.page}?sortby=${op.sortBy}`;
				if(op.search) url += `&search=${op.search}`;
				return url;
			},
			providesTags: ['Users']
		}),
		getUsers: builder.query<UserWithResidence[], void>({
			query: () => '/admin/users',
			providesTags: ['Users']
		}),
		createUser: builder.mutation<UserResponse, User>({
			query: user => ({
				url: '/admin/users',
				method: 'POST',
				body: user
			}),
			invalidatesTags: ['Users']
		}),
		updateUser: builder.mutation<UserResponse, User>({
			query: user => ({
				url: `/admin/users/${user.id}`,
				method: 'PATCH',
				body: user
			}),
			invalidatesTags: ['Users']
		}),
		deleteUser: builder.mutation<UserResponse, number>({
			query: userId => ({
				url: `/admin/users/${userId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Users']
		})
	})
});

export const {
	useLoginUserMutation,
	useGetUsersQuery,
	useGetPaginatedUsersQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation
} = usersApiSlice;
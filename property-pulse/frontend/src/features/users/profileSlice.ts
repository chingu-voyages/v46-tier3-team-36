import { apiSlice } from '../api/apiSlice';
import { User } from './userType';

interface UserResponse {
	user: User;
};

interface PromotionCode {
	code: string;
}

export const profileApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		updateProfile: builder.mutation<UserResponse, User>({
			query: user => ({
				url: '/admin/profile',
				method: 'PATCH',
				body: user
			})
		}),
		promoteSelf: builder.mutation<UserResponse, PromotionCode>({
			query: code => ({
				url: '/users/promote',
				method: 'PATCH',
				body: code
			})
		}),
		demoteSelf: builder.mutation<UserResponse, void>({
			query: () => ({
				url: '/users/demote',
				method: 'PATCH'
			})
		})
	})
});

export const {
	useUpdateProfileMutation,
	usePromoteSelfMutation,
	useDemoteSelfMutation
} = profileApiSlice;
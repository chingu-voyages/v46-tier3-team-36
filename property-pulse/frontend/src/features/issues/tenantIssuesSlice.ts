import { apiSlice } from '../api/apiSlice';

export const issuesApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getIssues: builder.query({
			query: () => '/tenant/issues',
			providesTags: ['Issues']
		}),
	})
});

export const {
	useGetIssuesQuery,
} = issuesApiSlice;
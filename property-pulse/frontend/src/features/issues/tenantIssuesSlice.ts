import { apiSlice } from '../api/apiSlice';

export const issuesApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getIssues: builder.query({
			query: () => '/tenant/issues',
			providesTags: ['Issues']
		}),
		createIssue: builder.mutation({
			query: issue => ({
				url: 'tenant/issues',
				method: 'POST',
				body: issue
			}),
			invalidatesTags: ['Issues']
		}),
		updateIssue: builder.mutation({
			query: issue => ({
				url: `/tenant/issues/${issue.id}`,
				method: 'PATCH',
				body: issue
			}),
			invalidatesTags: ['Issues']
		}),
		deleteIssue: builder.mutation({
			query: issueId => ({
				url: `/tenant/issues/${issueId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Issues']
		})
	})
});

export const {
	useGetIssuesQuery,
	useCreateIssueMutation,
	useUpdateIssueMutation,
	useDeleteIssueMutation
} = issuesApiSlice;
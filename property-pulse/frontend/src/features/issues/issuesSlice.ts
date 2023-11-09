import { apiSlice } from '../api/apiSlice';

export const issuesApiSliceAdmin = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getIssues: builder.query({
			query: () => '/admin/issues',
			providesTags: ['Issues']
		}),
		createIssue: builder.mutation({
			query: issue => ({
				url: '/issues/create',
				method: 'POST',
				body: issue
			}),
			invalidatesTags: ['Issues']
		}),
		updateIssue: builder.mutation({
			query: issue => ({
				url: `/issues/update/${issue.id}`,
				method: 'PATCH',
				body: issue
			}),
			invalidatesTags: ['Issues']
		}),
		deleteIssue: builder.mutation({
			query: issueId => ({
				url: `/issues/delete/${issueId}`,
				method: 'DELETE'
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
} = issuesApiSliceAdmin;
import { apiSlice } from '../api/apiSlice';

export const issuesApiSliceAdmin = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getIssuesAdmin: builder.query({
			query: () => '/admin/issues',
			providesTags: ['Issues']
		}),
		createIssueAdmin: builder.mutation({
			query: issue => ({
				url: '/admin/issues',
				method: 'POST',
				body: issue
			}),
			invalidatesTags: ['Issues']
		}),
		updateIssueAdmin: builder.mutation({
			query: issue => ({
				url: `/admin/issue/${issue.id}`,
				method: 'PATCH',
				body: issue
			}),
			invalidatesTags: ['Issues']
		}),
		deleteIssueAdmin: builder.mutation({
			query: issueId => ({
				url: `/admin/issues/${issueId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Issues']
		})
	})
});

export const {
	useGetIssuesAdminQuery,
	useCreateIssueAdminMutation,
	useUpdateIssueAdminMutation,
	useDeleteIssueAdminMutation
} = issuesApiSliceAdmin;
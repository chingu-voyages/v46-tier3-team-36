import { apiSlice } from '../api/apiSlice';

export const issuesApiSliceAdmin = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getIssuesAdmin: builder.query({
			query: () => '/admin/issues',
			providesTags: ['Issues']
		}),
		createIssueAdmin: builder.mutation({
			query: issue => ({
				url: '/issues/create',
				method: 'POST',
				body: issue
			}),
			invalidatesTags: ['Issues']
		}),
		updateIssueAdmin: builder.mutation({
			query: issue => ({
				url: `/issues/update/${issue.id}`,
				method: 'PATCH',
				body: issue
			}),
			invalidatesTags: ['Issues']
		}),
		deleteIssueAdmin: builder.mutation({
			query: issueId => ({
				url: `/issues/delete/${issueId}`,
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
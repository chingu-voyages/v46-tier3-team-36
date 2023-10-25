import { apiSlice } from '../api/apiSlice';

export const propertiesApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProperties: builder.query({
			query: () => '/properties',
			providesTags: ['Properties']
		}),
		createProperty: builder.mutation({
			query: property => ({
				url: '/properties/create',
				method: 'POST',
				body: property
			}),
			invalidatesTags: ['Properties']
		}),
		updateProperty: builder.mutation({
			query: property => ({
				url: `/properties/update/${property.id}`,
				method: 'PATCH',
				body: property
			}),
			invalidatesTags: ['Properties']
		}),
		deleteProperty: builder.mutation({
			query: propertyId => ({
				url: `/properties/delete/${propertyId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Properties']
		})
	})
});

export const {
	useGetPropertiesQuery,
	useCreatePropertyMutation,
	useUpdatePropertyMutation,
	useDeletePropertyMutation
} = propertiesApiSlice;
import { apiSlice } from '../api/apiSlice';
import { Property } from '../../../../backend/utils/prisma-proxy';
import { PropertyWithOwner, NewPropertyData } from './PropertyTypes';

export const propertiesApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProperties: builder.query<PropertyWithOwner[], void>({
			query: () => '/admin/properties',
			providesTags: ['Properties']
		}),
		createProperty: builder.mutation<Property, NewPropertyData>({
			query: newPropertyData => ({
				url: '/admin/properties',
				method: 'POST',
				body: newPropertyData
			}),
			invalidatesTags: ['Properties']
		}),
		updateProperty: builder.mutation<Property, Property>({
			query: property => ({
				url: `/admin/properties/${property.id}`,
				method: 'PATCH',
				body: property
			}),
			invalidatesTags: ['Properties']
		}),
		deleteProperty: builder.mutation<Property, number>({
			query: propertyId => ({
				url: `/admin/properties/${propertyId}`,
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
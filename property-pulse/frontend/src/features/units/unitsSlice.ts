import { apiSlice } from '../api/apiSlice';
import { Unit, Property } from '../../../../backend/utils/prisma-proxy';

export const unitsApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getUnitsForProperty: builder.query<Unit[], Property>({
			query: property => `/admin/units?propertyid=${property.id}`,
			providesTags: ['Units']
		}),
		getUnits: builder.query<Unit[], void>({
			query: () => '/admin/units',
			providesTags: ['Units']
		}),
		createUnit: builder.mutation<Unit, Unit>({
			query: unit => ({
				url: '/admin/units',
				method: 'POST',
				body: unit
			}),
			invalidatesTags: ['Units']
		}),
		updateUnit: builder.mutation<Unit, Unit>({
			query: unit => ({
				url: `/admin/units/${unit.id}`,
				method: 'PATCH',
				body: unit
			}),
			invalidatesTags: ['Units']
		}),
		deleteUnit: builder.mutation<Unit, number>({
			query: unitId => ({
				url: `/admin/units/${unitId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Units']
		})
	})
});

export const {
	useGetUnitsForPropertyQuery,
	useGetUnitsQuery,
	useCreateUnitMutation,
	useUpdateUnitMutation,
	useDeleteUnitMutation
} = unitsApiSlice;
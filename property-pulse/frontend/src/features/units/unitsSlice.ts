import { apiSlice } from '../api/apiSlice';
import { Unit } from './unitType';
import { UnitWithProperty } from './unitType';

export const unitsApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getUnitsForProperty: builder.query<UnitWithProperty[], number>({
			query: propertyId => `/admin/units?propertyid=${propertyId}`,
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
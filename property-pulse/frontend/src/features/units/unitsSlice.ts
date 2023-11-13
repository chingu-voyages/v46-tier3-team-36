import { apiSlice } from '../api/apiSlice';
import { Unit, UnitWithPropertyTenants } from './unitType';

export interface UnitResponse {
	unit: Unit;
};

export const unitsApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getUnitsForProperty: builder.query<UnitWithPropertyTenants[], number>({
			query: propertyId => `/admin/units?propertyid=${propertyId}`,
			providesTags: ['Units']
		}),
		getUnits: builder.query<Unit[], void>({
			query: () => '/admin/units',
			providesTags: ['Units']
		}),
		createUnit: builder.mutation<UnitResponse, Unit>({
			query: unit => ({
				url: '/admin/units',
				method: 'POST',
				body: unit
			}),
			invalidatesTags: ['Units']
		}),
		updateUnit: builder.mutation<UnitResponse, Unit>({
			query: unit => ({
				url: `/admin/units/${unit.id}`,
				method: 'PATCH',
				body: unit
			}),
			invalidatesTags: ['Units']
		}),
		deleteUnit: builder.mutation<UnitResponse, number>({
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
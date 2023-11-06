import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: '/api'}),
	tagTypes: ['Users', 'Properties', 'Issues', 'Units', 'Notifications'],
	endpoints: builder => ({})
});
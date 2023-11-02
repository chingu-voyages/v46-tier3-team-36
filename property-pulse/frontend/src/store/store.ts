import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/features/users/userReducer';
import { apiSlice } from '@/features/api/apiSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
	reducer: {
		user: userReducer,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
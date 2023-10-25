import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import usersReducer from '@/features/users/usersSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
	reducer: {
		user: userReducer,
		users: usersReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
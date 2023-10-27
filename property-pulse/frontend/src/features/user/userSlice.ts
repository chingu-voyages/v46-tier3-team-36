import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { User } from '../users/userType';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		loggedInUser: null as User | null
	},
	reducers: {
		userLoggedIn: (state, action: PayloadAction<User | null>) => {
			state.loggedInUser = action.payload;
		}
	}
});

export const selectUser = (state:RootState) => state.user.loggedInUser;
export const { userLoggedIn } = userSlice.actions;
export default userSlice.reducer;
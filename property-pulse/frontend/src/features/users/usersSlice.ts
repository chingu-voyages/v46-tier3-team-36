import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { User } from './userType';

interface State {
	users: User[];
	status: String;
	error?: String;
};

const initialState:State = {
	users: [],
	status: 'idle'
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await fetch('/fakedata/users.json');
	return await response.json();
});

export const createUser = createAsyncThunk('users/createUser', async (user:User) => {
	const response = await fetch('[Create New User Endpoint]', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	});
	return await response.json();
});

export const updateUser = createAsyncThunk('users/updateUser', async (user:User) => {
	const response = await fetch('[Update User Endpoint]', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	});
	return await response.json();
});

export const deleteUser = createAsyncThunk('users/deleteUser', async () => {
	const response = await fetch('[Delete User Endpoint]', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
	});
	return await response.json();
});

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchUsers.pending, (state, action) => {
				state.status = 'pending';
			})
			.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
				state.users = action.payload;
				state.status = 'fulfilled';
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.error.message;
			})
			.addCase(createUser.fulfilled, (state, action:PayloadAction<User>) => {
				state.users.push(action.payload);
				state.status = 'fulfilled';
			})
			.addCase(updateUser.fulfilled, (state, action:PayloadAction<User>) => {
				state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
				state.status = 'fulfilled';
			})
			.addCase(deleteUser.fulfilled, (state, action:PayloadAction<User>) => {
				state.users.filter(user => user.id !== action.payload.id);
				state.status = 'fulfilled';
			})
	}
});

export const selectUsers = (state:RootState) => state.users.users;
export default usersSlice.reducer;
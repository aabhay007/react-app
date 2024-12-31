import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  username: string;
  email: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersRequest(state) {
      state.loading = true;
    },
    fetchUsersSuccess(state, action: PayloadAction<User[]>) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addUserRequest(state) {
      state.loading = true;
    },
    addUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.users.push(action.payload);
    },
    addUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest(state) {
      state.loading = true;
    },
    deleteUserSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    deleteUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    editUserRequest(state) {
      state.loading = true;
    },
    editUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    editUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  editUserRequest,
  editUserSuccess,
  editUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
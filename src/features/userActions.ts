import { Dispatch } from 'redux';
import {
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
} from './userSlice';
import { fetchUsers, addUser , deleteUser , editUser  } from '../utils/api';

export const fetchUsersAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const users = await fetchUsers();
    dispatch(fetchUsersSuccess(users));
  } catch (error: any) {
    dispatch(fetchUsersFailure(error.message));
  }
};

export const addUserAction = (user: { username: string; email: string; password: string }) => async (dispatch: Dispatch) => {
  dispatch(addUserRequest());
  try {
    const newUser  = await addUser(user);
    dispatch(addUserSuccess(newUser ));
  } catch (error: any) {
    dispatch(addUserFailure(error.message));
  }
};

export const deleteUserAction = (id: number) => async (dispatch: Dispatch) => {
  dispatch(deleteUserRequest());
  try {
    await deleteUser (id);
    dispatch(deleteUserSuccess(id));
  } catch (error: any) {
    dispatch(deleteUserFailure(error.message));
  }
};

export const editUserAction = (user: { id: number; username: string; email: string }) => async (dispatch: Dispatch) => {
  dispatch(editUserRequest());
  try {
    const updatedUser  = await editUser (user);
    dispatch(editUserSuccess(updatedUser ));
  } catch (error: any) {
    dispatch(editUserFailure(error.message));
  }
};
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

interface User {
  id: number;
  username: string;
  email: string;
}

interface AddUser {
  username: string;
  email: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('users/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUser = async (user: AddUser): Promise<User> => {
  try {
    const response = await api.post('users/', user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await api.delete(`users/${id}/`);
  } catch (error) {
    throw error;
  }
};

export const editUser    = async (user: User): Promise<User> => {
  try {
    const response = await api.put(`users/${user.id}/`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
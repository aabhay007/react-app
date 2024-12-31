import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../features/authSlice';
import userReducer from '../features/userSlice'; // Add your user slice

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // Root key for persistence
  storage, // Specify the storage type
  whitelist: ['auth'], // Specify which reducers to persist
};

// Persisted reducer for auth
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: userReducer, // Include the user slice (non-persisted)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist compatibility
    }),
});

// Create persistor for the store
export const persistor = persistStore(store);

// Export types for use with TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

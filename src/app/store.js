import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import api from './api/api';

const reducer = {
  [api.reducerPath]: api.reducer,
  auth: authReducer,
  message: messageReducer
}

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware
  ],
  devTools: true
});

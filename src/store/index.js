import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import authReducer from "./slices/authSlice";
import { authApi } from "./services/AuthServices";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, authApi.middleware),
});

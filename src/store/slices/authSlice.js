import { createSlice } from '@reduxjs/toolkit';

const AUTH_TOKEN_KEY = 'rbac_auth_token';
const AUTH_USER_KEY = 'rbac_auth_user';

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload.token ?? state.token;
      state.user = payload.user ?? state.user;
      if (payload.token !== undefined) {
        try {
          localStorage.setItem(AUTH_TOKEN_KEY, payload.token);
        } catch {
          // ignore
        }
      }
      if (payload.user !== undefined) {
        try {
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(payload.user));
        } catch {
          // ignore
        }
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      try {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
      } catch {
        // ignore
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);

export const getStoredToken = () => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export default authSlice.reducer;

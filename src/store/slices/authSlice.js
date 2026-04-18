import { createSlice } from '@reduxjs/toolkit';

const AUTH_USER_KEY = 'rbac_auth_user';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user ?? state.user;
      if (payload.user !== undefined) {
        try {
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(payload.user));
        } catch {
          // ignore
        }
      }
    },
    logout: (state) => {
      state.user = null;
      try {
        localStorage.removeItem(AUTH_USER_KEY);
      } catch {
        // ignore
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) =>
  Boolean(state.auth.user?.uuid || state.auth.user?.id || state.auth.user?.email);

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export default authSlice.reducer;

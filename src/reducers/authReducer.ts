import { AuthState, User } from 'types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
  user: null,
  isLoading: false
};

export const authSlice = createSlice({
  name: 'authenticator',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.error = null;
      state.user = action.payload
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
})

export const { loginFailure, loginSuccess, setLoading } = authSlice.actions

export const isAuthenticated = (state: RootState) => state.authenticator.isAuthenticated
//export const isLoading = (state: RootState) => state.authenticator.isLoading

export default authSlice.reducer
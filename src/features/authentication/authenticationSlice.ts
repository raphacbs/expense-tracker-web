import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { AuthenticationState, UserBodyRequest, UserBodyResponse } from 'types';
import { login } from './authenticationAPI';
import { isAuthenticated } from 'actions/auth';

const initialState: AuthenticationState = {
    isAuthenticated: isAuthenticated(),
    error: null,
    user: null,
    status: 'idle',
    token: null
};

export const doLogin = createAsyncThunk(
    'counter/fetchCount',
    async (user: UserBodyRequest) => {
        const response = await login(user)
        // The value we return becomes the `fulfilled` action payload
        return response
    }
)

export const authenticationSlice = createSlice({
    name: "authenticator",
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<UserBodyResponse>) => {
            state.isAuthenticated = true;
            state.error = null;
            state.user = action.payload.user;
            state.status = 'idle';
            state.token = action.payload.token;
            localStorage.setItem("authToken", action.payload.token as string);
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = false;
            state.error = action.payload;
        },
        setStatus: (state, action: PayloadAction<"idle" | "loading" | "failed">) => {
            state.status = action.payload
        },
        signOut: (state) => {
            state.isAuthenticated = false;
            state.error = null;
            state.user = null;
            state.status = 'idle';
            state.token = null;
            localStorage.removeItem("authToken");
        },
        
    },
    extraReducers: builder => {
        builder
            .addCase(doLogin.pending, state => {
                state.status = 'loading'
            })
            .addCase(doLogin.fulfilled, (state, action) => {
                state.status = 'idle'
                state.user = action.payload
                state.isAuthenticated = true
            })
            .addCase(doLogin.rejected, (state) => {
                state.status = 'idle'
                state.user = null
                state.isAuthenticated = false
            })
    }
})

export const { signIn, loginFailure, setStatus, signOut } = authenticationSlice.actions

export const loggedUser = (state: RootState) => state.authenticator.user
export const isLoading = (state: RootState) => state.authenticator.status == 'loading'

export default authenticationSlice.reducer
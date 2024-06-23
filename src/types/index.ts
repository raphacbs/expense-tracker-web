import { loginFailure, loginSuccess } from "reducers/authReducer";
import { LOGIN_FAILURE, LOGIN_SUCCESS } from "../actions/auth";

interface LoginSuccessAction {
    type: string;
    payload: User;
}

interface LoginFailureAction {
    type: string;
    payload: string;
}

export type AuthActionTypes = LoginSuccessAction | LoginFailureAction;

export interface AuthState {
  isAuthenticated: boolean;
  error: string | null;
  user: User | null;
  isLoading: boolean;
}

export interface AuthenticationState {
  isAuthenticated: boolean;
  error: string | null;
  user: User | null;
  status: 'idle' | 'loading' | 'failed';
  token: null | string;
}

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  firstName: string;
  lastName: string;
  googleAccountId: string | null;
  initials: string;
}

export interface UserBodyResponse {
  token: string | null;
  message: string;
  expiredAt: string;
  user: User | null;
}

export interface UserBodyRequest {
  email: string, 
  password: string
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

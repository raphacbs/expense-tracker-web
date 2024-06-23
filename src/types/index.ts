import { loginFailure, loginSuccess } from "reducers/authReducer";
import { LOGIN_FAILURE, LOGIN_SUCCESS } from "../actions/auth";
import type { MenuProps } from 'antd';

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

export type MenuItem = Required<MenuProps>['items'][number];

export type ExtendedMenuItem = MenuItem & {
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>) => void;
  path?: string;
};

export interface CategoryState {
  selectedCategory: Category | null,
  categories: Category[],
  isLoading: boolean,
  params: CategoryParam
}

export interface Category {
  id?: string,
  name: string,
  description: string,
  color: string,
  type: string,
  isDeleted: boolean
}

export type CategoryParam = Params & {
  name: string | null,
  description: string | null,
  type: "R | E" | null
}

export type Params  = {
  pageSize: number,
  sortBy: string,
  sortDir: string,
  pageNo: number
}
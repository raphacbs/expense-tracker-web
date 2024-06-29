import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import axiosInstance from '../utils/api';
import { User } from 'types'; // Certifique-se de importar corretamente o tipo User
import { UnknownAction, Dispatch } from 'redux';
import { loginSuccess, loginFailure, setLoading } from '../reducers/authReducer';


// Tipos de ações 
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, UnknownAction> => {
  return async (dispatch: Dispatch<UnknownAction>) => {
    try {
      dispatch({
        payload: true,
        type: setLoading.name
      })
      const response = await axiosInstance.post('/api/v1/user/auth', { email, password });
      const user: User = response.data.user; // Certifique-se de tipar corretamente o usuário
      const token: string = response.data.token; // Certifique-se de tipar corretamente o token
      localStorage.setItem("authToken", token);
      dispatch({
        payload: user,
        type: loginSuccess.name
      }); // Dispatch da action correta: loginSuccess
    } catch (error) {
      dispatch({
        payload: 'Login failed',
        type: loginFailure.name
      }); // Dispatch da action correta: loginFailure
      throw error;
    }
  };
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};



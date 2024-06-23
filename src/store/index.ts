import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authenticatorReducer from 'features/authentication/authenticationSlice';
export const store = configureStore(
  {
    reducer: {
      authenticator: authenticatorReducer
    },
  }
);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>


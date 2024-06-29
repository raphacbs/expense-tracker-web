import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authenticatorReducer from 'features/authentication/authenticationSlice';
import categoryReducer from './../features/category/categorySlice';
import globalReducer from 'features/global/globalSlice';
export const store = configureStore(
  {
    reducer: {
      authenticator: authenticatorReducer,
      category: categoryReducer,
      global: globalReducer
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


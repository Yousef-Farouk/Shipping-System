import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { Auth } from './auth.model';

export const initialState: Auth = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.setAuthenticatedUser, (state, { user, token, refreshToken }) => ({
    ...state,
    user,
    token,
    refreshToken,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: error,
  })),

  on(AuthActions.refreshSuccess, (state, { response }) => ({
    ...state,
    refreshToken: response.refreshToken,
    token: response.accessToken
  })),

  on(AuthActions.refreshFailure, (state, { error }) => ({
    ...state,
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: error,
  })),



  // Reset the state to its initial values on logout
  on(AuthActions.logout, () => initialState)
);

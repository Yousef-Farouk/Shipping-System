import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Auth } from './auth.model';

// The feature name should match the one used in the StoreModule.forFeature() registration
export const selectAuthState = createFeatureSelector<Auth>('Auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: Auth) => state.isAuthenticated
);

export const selectUser = createSelector(
  selectAuthState,
  (state: Auth) => state.user
);

export const selectToken = createSelector(
  selectAuthState,
  (state: Auth) => state.token
);

export const selectRefreshToken = createSelector(
  selectAuthState,
  (state: Auth) => state.refreshToken
);

// export const selectRoleName = createSelector(
//   selectAuthState,
//   (state: Auth) => state.token
// );

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: Auth) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: Auth) => state.error
);

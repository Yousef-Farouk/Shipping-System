import { response } from 'express';
import { RefreshToken } from './../../../modules/shared/Models/RefreshToken';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginDTO } from '../../../modules/shared/Models/login-dto';
import { ResponseDTO } from '../../../modules/shared/Models/response-dto';
import { User } from './auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth API',
  events: {
    'Login': props<{ credentials: LoginDTO }>(),
    'Login Success': props<{ response: ResponseDTO }>(),
    'Set Authenticated User': props<{ user: User, token: string, refreshToken: string }>(),
    'Login Failure': props<{ error: any }>(),
    'Logout': emptyProps(),
    'Refresh':props<{tokens:RefreshToken}>(),
    'Refresh Success':props<{response:RefreshToken}>(),
    "Refresh Failure":props<{error: any}>(),
    "Rehydtrate Auth":emptyProps()
  },
});

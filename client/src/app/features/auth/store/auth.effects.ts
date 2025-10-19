import { RefreshToken } from './../../../modules/shared/Models/RefreshToken';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from '../../../modules/shared/services/auth.service';
import { AuthActions } from './auth.actions';
import { jwtDecode } from 'jwt-decode';
import { User } from './auth.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((response) => AuthActions.loginSuccess({ response })),
          catchError((error) =>{
            return of(AuthActions.loginFailure({ error }))
          })
            
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ response }) => {
        this.authService.handleLogin(response);
        this.snackBar.open('تم تسجيل الدخول بنجاح', 'اغلاق', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          direction: 'rtl',
        });
      }),
      map(({ response }) => {
        const tokenData: any = jwtDecode(response.token);
        const user: User = {
          userId: tokenData['userId'],
          roleName: tokenData['roleName'],
          roleId: tokenData['roleId'],
          groupPrivelege: JSON.parse(tokenData['groupPrivelege'] || '[]'),
        };
        return AuthActions.setAuthenticatedUser({
          user,
          token: response.token,
          refreshToken: response.refreshToken,
        });
      })
    )
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          this.snackBar.open(error, 'اغلاق', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            direction: 'rtl',
          });
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.logout();
        })
      ),
    { dispatch: false }
  );

 
  refresh$ = createEffect(()=>
    this.actions$.pipe(
      ofType(AuthActions.refresh),
      exhaustMap((action)=>
         this.authService.refresh(action.tokens).pipe(
          map((response)=>
            AuthActions.refreshSuccess({response})
          ),
          catchError((error)=> {
            //console.log("refresh failure error :" ,error)
            return of(AuthActions.refreshFailure({error}))
          }
          )
        )
      )
    )
  )

  refreshSuccess$ = createEffect(()=>
     this.actions$.pipe(
      ofType(AuthActions.refreshSuccess),
      tap(({response})=>{
        this.authService.setToken(response.accessToken)
        this.authService.setRerfreshToken(response.refreshToken)
        //console.log("new token",response.accessToken)
      }
      ),      
     ),
     { dispatch: false }

  )

   refreshFailure$ = createEffect(()=>
     this.actions$.pipe(
      ofType(AuthActions.refreshFailure),
      map(()=>AuthActions.logout()),      
     )

  )

  //  setAuthuser$ = createEffect(()=>
  //    this.actions$.pipe(
  //     ofType(AuthActions.setAuthenticatedUser),
  //     tap((user)=>{
  //       console.log("set auth user dispatched",user)
        
  //     }),      
  //   ),
  //   { dispatch: false }

  // )


  RehydtrateAuth$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(AuthActions.rehydtrateAuth),
      map(()=>{
        const accessToken = this.authService.getToken()
        const refreshToken = this.authService.getRerfreshToken()
        //if(accessToken)
        if(accessToken && refreshToken){
          console.log("rehyfrate dispatched")
          const accessTokenData:any = jwtDecode(accessToken)
          const user: User = {
            userId: accessTokenData['userId'],
            roleName: accessTokenData['roleName'],
            roleId: accessTokenData['roleId'],
            groupPrivelege: JSON.parse(accessTokenData['groupPrivelege'] || '[]'),
          };
          return AuthActions.setAuthenticatedUser({
            user,
            token: accessToken,
            refreshToken: refreshToken,
          });
        }
        else{
          console.log("logout actions dispatched")
          return AuthActions.logout()
        }
      })
    )
    // ,
    // { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}
}

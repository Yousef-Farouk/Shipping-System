import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, take, throwError, pipe, mergeMap, filter, concatMap } from 'rxjs';
import { AuthService } from '../modules/shared/services/auth.service';
import { RefreshToken } from '../modules/shared/Models/RefreshToken';
import { Router } from '@angular/router';
import { Auth } from '../features/auth/store/auth.model';
import { Store } from '@ngrx/store';
import { selectRefreshToken, selectToken } from '../features/auth/store/auth.selectors';
import { AuthActions } from '../features/auth/store/auth.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router : Router,
              private store : Store<Auth>,
              private actions$ : Actions
            ) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = this.authService.getToken();
  //   if (token) {
  //     req = this.addAuthHeader(req,token)
  //     return next.handle(req).pipe(
  //       catchError((error:HttpErrorResponse)=>{
  //              if(error.status == 401){
  //                  return this.handleRefreshToken(req,next)
  //              }
  //              return throwError(()=>error)
  //       })
  //     )
      

  //   }
  //   return next.handle(req);
  // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(selectToken).pipe(
          take(1),
          switchMap(token=>{
            if(token)
            {
              //debugger
              //console.log("interceptor token" , token)
              req = this.addAuthHeader(req,token)
              return next.handle(req).pipe(
                catchError((error:HttpErrorResponse)=>{
                  if(error.status == 401)
                      return this.handleRefreshToken(req,next,token)
                  
                  return throwError(()=> error)
                })
              )
            }
            return next.handle(req);
          })
        )
  }
  
  // private handleRefreshToken(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
  // {

  //    const refreshTokenDto : RefreshToken = {
  //           accessToken  :this.authService.getToken(),
  //           refreshToken : this.authService.getRerfreshToken()
  //         } 

  //   return this.authService.refresh(refreshTokenDto).pipe(

  //     switchMap((response:RefreshToken)=>{
          
  //        this.authService.setToken(response.accessToken)
  //        this.authService.setRerfreshToken(response.refreshToken)
  //        console.log("new tokens set");

  //        return next.handle(this.addAuthHeader(req,response.accessToken))

  //     }),
  //     catchError((error)=>{
  //       console.log("error call refresh",error);
  //       this.authService.logout();
  //       this.router.navigate(['/auth/logout'])
  //       return throwError(()=>error)
  //     })
  //   )

  // }
  

  private handleRefreshToken(req:HttpRequest<any>,next:HttpHandler,token:string):Observable<HttpEvent<any>>
  {
    return this.store.select(selectRefreshToken).pipe(
              take(1),
              switchMap(refreshToken=>{
                if(!refreshToken)
                {
                  const error = new Error("No refresh token available")
                  this.store.dispatch(AuthActions.refreshFailure({error}))
                  return throwError(() =>error);
                }
                const tokens : RefreshToken = {
                    accessToken  : token,
                    refreshToken : refreshToken
                }
                this.store.dispatch(AuthActions.refresh({tokens}))
                return this.actions$.pipe(
                ofType(AuthActions.refreshSuccess),
                take(1),
                switchMap(action=>{
                    return this.store.select(selectToken).pipe(
                            filter(newToken => newToken !== null && newToken !== token),
                            take(1),
                            switchMap((newToken =>{
                                return next.handle(this.addAuthHeader(req,newToken!))
                              } 
                            )),
                          catchError((error)=>{
                              this.store.dispatch(AuthActions.refreshFailure({error}))
                              return throwError(()=>error)
                          })         
                    )
              })
              )}
            )
              
      )

     
      
  }

  private addAuthHeader(req:HttpRequest<any>,token:string):HttpRequest<any>
  {
    return req.clone({ 
      setHeaders: {
          Authorization: `Bearer ${token}`
        }
    }   
    )
  }
}

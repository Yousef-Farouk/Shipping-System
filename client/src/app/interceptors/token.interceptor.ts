import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../modules/shared/services/auth.service';
import { RefreshToken } from '../modules/shared/Models/RefreshToken';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private router : Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      req = this.addAuthHeader(req,token)
      return next.handle(req).pipe(
        catchError((error:HttpErrorResponse)=>{
               if(error.status == 401){
                   return this.handleRefreshToken(req,next)
               }
               return throwError(()=>error)
        })
      )
      

    }
    return next.handle(req);
  }
  
  private handleRefreshToken(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
  {

     const refreshTokenDto : RefreshToken = {
            accessToken  :this.authService.getToken(),
            refreshToken : this.authService.getRerfreshToken()
          } 

    return this.authService.refresh(refreshTokenDto).pipe(

      switchMap((response:RefreshToken)=>{
          
         this.authService.setToken(response.accessToken)
         this.authService.setRerfreshToken(response.refreshToken)
         console.log("new tokens set");

         return next.handle(this.addAuthHeader(req,response.accessToken))

      }),
      catchError((error)=>{
        console.log("error call refresh",error);
        this.authService.logout();
        this.router.navigate(['/auth/logout'])
        return throwError(()=>error)
      })
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

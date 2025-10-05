import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EmptyError, Observable, catchError, map, throwError } from 'rxjs';

import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Actions, actionToPropertyMap, Roles } from '../Enums/rolesEnum';
import { GroupPrivilegeDTO } from '../../../features/admin/interfaces/group-privilege-dto';
import { environment } from '../../../../environments/environment';
import { ResponseDTO } from '../../../features/auth/interfaces/response-dto';
import { LoginDTO } from '../../../features/auth/interfaces/login-dto';
import { ForgetPasswordDTO } from '../../../features/auth/interfaces/forget-password-dto';
import { ResetPasswordDTO } from '../../../features/auth/interfaces/reset-password-dto';
import { UserDetailsDTO } from '../../../features/auth/interfaces/user-details-dto';
import { PrivilegeDTO } from '../../../features/admin/interfaces/privilege-dto';
import { RefreshToken } from '../Models/RefreshToken';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private roleIdKey = 'roleId';
  private roleName = 'roleName';
  private privilegesKey = 'privileges';
  private userIdKey = 'userId';
  private refreshTokenKey = 'refreshToken'
  private  grouPrivileges : GroupPrivilegeDTO[] = []
  private premissions : PrivilegeDTO[] = []
  private apiURL = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
  };

  constructor(
    private http:HttpClient, 
    private router: Router ,
    private cookieService : CookieService 
  ) { 

   //this.loadPremission()
  }

  // login(loginCredentials: LoginDTO): Observable<ResponseDTO> {
  //   return this.http.post<ResponseDTO>(`${this.apiURL}Account/Login`, loginCredentials, this.httpOptions).pipe(map(response => {
  //     console.log("res ",JSON.stringify(response));
  //     localStorage.setItem('token', response.token);
  //     localStorage.setItem('role', response.role);
  //     this.GetUserPrivilegesByUserId();
  //     return response;
  //   }));
  // }


  login(loginCredentials: LoginDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.apiURL}Account/Login`, loginCredentials, this.httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        // It's better to use console.error for logging errors
        console.error('An error occurred during login:', error);
        // Re-throw the error so the component can handle it
        return throwError(() => error.error.message);
      })

    );
  }
  
  refresh(refreshDto:RefreshToken): Observable<RefreshToken>
  {
    return this.http.post<RefreshToken>(`${this.apiURL}Account/refresh`,refreshDto,this.httpOptions).pipe(
      catchError((error:HttpErrorResponse)=>{
        return throwError(()=>error.error.message)
      })
    )

  }

  handleLogin(res:ResponseDTO)
  {
    const token :string = res.token
    const tokenData : any = jwtDecode(token)
    const roleId =tokenData['roleId'] ;
    const userId = tokenData['userId']
    const roleName =tokenData['roleName'] ;
    const refreshToken = res.refreshToken 
    this.cookieService.set(this.tokenKey,token,undefined,undefined,undefined,true,'Strict')
    this.cookieService.set(this.roleIdKey,roleId,undefined,undefined,undefined,true,'Strict')
    this.cookieService.set(this.userIdKey,userId,undefined,undefined,undefined,true,'Strict')
    this.cookieService.set(this.refreshTokenKey,refreshToken,undefined,undefined,undefined,true,'Strict')
    this.cookieService.set(this.roleName,roleName,undefined,undefined,undefined,true,'Strict')

    this.router.navigate(['']);
    
    // if (role === Roles.employee ){
    //   this.router.navigate(['/employee']);
    // } else if (role === Roles.representative) {
    //   this.router.navigate(['/representative']);
    // } else if (role === Roles.merchant) {
    //   this.router.navigate(['/merchant']);
    // }
  }

  private GetUserPrivilegesByUserId(){
    this.http.get<GroupPrivilegeDTO>(`${this.apiURL}Account/GetUserPrivilegesByUserId`).subscribe({
      next: (data) => {
        localStorage.setItem(this.privilegesKey, JSON.stringify(data));
      }
    })
  }

  logout(): void {
    // localStorage.removeItem(this.tokenKey);
    // localStorage.removeItem(this.roleKey);
    // localStorage.removeItem(this.privilegesKey);
    this.cookieService.deleteAll()
    this.router.navigate(['/auth/login']);
  }

  forgetPassword(credentials:ForgetPasswordDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.apiURL}Account/ForgetPassword`, { credentials },  this.httpOptions);
  }

  resetPassword(data: ResetPasswordDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(`${this.apiURL}/Account/resetPassword`, data);
  }

  getUserDetails(): Observable<UserDetailsDTO> {
    const url = `${this.apiURL}Account/GetUserDetails`;
    return this.http.get<UserDetailsDTO>(url);
  }

  // getUserDetails(): Observable<UserDetailsDTO> {
  //   const url = `${this.apiURL}Account/GetUserDetails`;
  //   return this.http.get<UserDetailsDTO>(url);
  // }

  getToken(): string {
    //return localStorage.getItem(this.tokenKey);
    return this.cookieService.get(this.tokenKey)
  }

  getRerfreshToken(): string {
    //return localStorage.getItem(this.tokenKey);
    return this.cookieService.get(this.refreshTokenKey)
  }

  setToken(token:string) {
    //return localStorage.getItem(this.tokenKey);
    this.cookieService.set(this.tokenKey,token,undefined,undefined,undefined,true,'Strict')
  }

  setRerfreshToken(refreshtoken : string) {
    //return localStorage.getItem(this.tokenKey);
    this.cookieService.set(this.refreshTokenKey,refreshtoken,undefined,undefined,undefined,true,'Strict')
  }

  getRole(): string  {
    //return localStorage.getItem(this.roleKey);
    return this.cookieService.get(this.roleName)
  }

  getRoleId():string{
    return this.cookieService.get(this.roleIdKey)
  }

  getUserId():string{
    return this.cookieService.get(this.userIdKey)
  }

  getPrivileges(): GroupPrivilegeDTO[] | null {
    const privileges = localStorage.getItem(this.privilegesKey);
    return privileges ? JSON.parse(privileges) : null;
  }

  isLoggedIn(): boolean {    
    const token :string = this.getToken();
    return (token?.length > 0  && !this.isTokenExpired(token));
  }

  private isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    const isExpired = (decoded.exp * 1000) <= Date.now();
    if (isExpired) {
      this.logout();
    }
    return isExpired;
  }

  // loadPremssions()
  // {
  //   const token = this.cookieService.get(this.tokenKey)
  //   if(token)
  //   {
  //       const tokenData :any = jwtDecode(token)
  //       this.premissions = JSON.parse(tokenData['premissions']);
  //       console.log("premissions" , this.premissions)
  //   }
  // }


  loadGroupPrivilege()
  {
    const token = this.cookieService.get(this.tokenKey)
    if(token)
    {
        const tokenData :any = jwtDecode(token)
        this.grouPrivileges = JSON.parse(tokenData['groupPrivelege']);
       // console.log("groupPrivelege" , this.grouPrivileges)
    }

  }

  hasPremssion(id :number,action :Actions) :boolean 
  {
    const groupPrivelege = this.grouPrivileges.find(gp => gp.privelege_Id === id) ;
    const actionName = actionToPropertyMap[action] ;
    if(!actionName || !groupPrivelege)
    {
      return false
    }
    return !!groupPrivelege[actionName];
  
  }
}

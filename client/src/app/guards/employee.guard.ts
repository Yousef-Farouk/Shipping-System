import { Employee } from './../Models/Employee';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../features/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Roles } from '../Enums/rolesEnum';


@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router,
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // const role = localStorage.getItem('role')
      const role = this.authService.getRole()
      if (role == Roles.employee)
      {
        console.log('employee login succeeded')
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}

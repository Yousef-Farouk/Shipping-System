import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../modules/shared/services/auth.service';
import { Roles } from '../modules/shared/Enums/rolesEnum';


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
      this.router.navigate(['/auth/login']);
      return false;
  }
}

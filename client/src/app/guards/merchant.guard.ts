import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/shared/services/auth.service';
import { Roles } from '../modules/shared/Enums/rolesEnum';


@Injectable({
  providedIn: 'root'
})
export class MerchantGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       const role = this.authService.getRole()
        if (role == Roles.merchant)
            {
              console.log('employee login succeeded')
              return true;
            }
            this.router.navigate(['/auth/login']);
        return false;    
  }
}

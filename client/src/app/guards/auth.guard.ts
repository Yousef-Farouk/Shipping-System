import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/shared/services/auth.service';

// export const authGuard: CanActivateFn = (route, state) =>
// {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if (authService.isLoggedIn()) {
//     router.navigate(['myGroups']);
//     return true;
//   }
//   else {
//     router.navigate(['/auth/login']);
//     return false;
//   }
// };

@Injectable({
  providedIn: 'root'
})

export class  authGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router:Router
    ){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = this.authService.getToken()
      if (token)
      {
        console.log('user login succeeded')
        return true;
      } 
      this.router.navigate(['/auth/login']);
      return false;
  }
}


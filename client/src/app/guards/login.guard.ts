import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/shared/services/auth.service';

// export const loginGuard: CanActivateFn = (route, state) => {

//     const authService = inject(AuthService);
//     const router = inject(Router)
//     const token = authService.getToken();

//     if(token)
//     {
//       router.navigate([''])
//     }
//     else
//       router.navigate(['/auth'])

//   return true;
// };


@Injectable({
  providedIn: 'root'
})

export class  loginGuard implements CanActivate {

  constructor(
    private authService:AuthService,
    private router:Router
    ){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.authService.getToken()
    if(!token)
    {
      //this.router.navigate([''])
      return true;
    }
    this.router.navigate([''])
    return false 

  }
}
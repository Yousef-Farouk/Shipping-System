import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, Observable, skip, take } from 'rxjs';
import { AuthService } from '../modules/shared/services/auth.service';
import { Store } from '@ngrx/store';
import { Auth } from '../features/auth/store/auth.model';
import { selectToken } from '../features/auth/store/auth.selectors';

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
    private router:Router,
    private store : Store<Auth>
    ){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.store.select(selectToken).pipe(
      take(1),
      filter(token => token !== null),
      map(token => {
        if (token) {
          return true;
        }
        return this.router.createUrlTree(['/auth/login']);
      })
    );

      // if (token)
      // {
      //   console.log('user login succeeded')
      //   return true;
      // } 
      // this.router.navigate(['/auth/login']);
      // return false;
  }
}


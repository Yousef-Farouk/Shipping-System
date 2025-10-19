import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../modules/shared/services/auth.service';
import { Roles } from '../modules/shared/Enums/rolesEnum';
import { Auth } from '../features/auth/store/auth.model';
import { Store } from '@ngrx/store';
import { selectUser } from '../features/auth/store/auth.selectors';


@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router,
    private store : Store<Auth>
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    
    ): Observable<boolean | UrlTree> {

      return this.store.select(selectUser).pipe(
        take(1),
        map(user=>{

          if(user && user.roleName == Roles.employee)
          {
            return true ;
          }

          return this.router.createUrlTree(['/auth/login']);
        })
      )
  }
}

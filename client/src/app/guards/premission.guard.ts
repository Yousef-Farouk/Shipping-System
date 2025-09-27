import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../modules/shared/services/auth.service';
import { PrivilegeService } from '../modules/shared/services/privilege.service';

export const premissionGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService)
    const premissionService = inject(PrivilegeService)
    const router = inject(Router)
    const premision = premissionService.premissions[route.data['premission']]
    const action = route.data['action']
    
    const result = authService.hasPremssion(premision,action);

    if(!result)
    {
      console.log('no premission')
      router.navigate(['/employee'])
      return false 
    }

    return true ;
};

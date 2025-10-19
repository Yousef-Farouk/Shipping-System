import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RepresentativeGuard } from './guards/representative.guard';
import { EmployeeGuard } from './guards/employee.guard';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { RehydrationResolver } from './guards/rehydration.resolver';
const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),canActivate:[loginGuard]
  },
  {
    path:'',
    loadChildren: () => import('./features/main screen/mainscreen.module').then(m => m.mainscreenModule),canActivate:[authGuard],
    // resolve: { rehydrated: RehydrationResolver }
  },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

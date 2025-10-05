import { MerchantGuard } from './guards/merchant.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { RepresentativeGuard } from './guards/representative.guard';
import { EmployeeGuard } from './guards/employee.guard';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
const routes: Routes = [
  //{path:'governate',loadChildren:()=>import('./features/governate/governate.module').then(m=>m.GovernateModule)},
  //{path:'city',loadChildren:()=>import('./features/city/city.module').then(m=>m.CityModule)},
  // {path:'employee',loadChildren:()=>import('./features/employee/employee.module').then(m=>m.EmployeeModule)},
  //{ path: 'merchants', loadChildren: () => import('./features/merchant/merchants.module').then(m => m.MerchantsModule)},
//  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  // { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)},
  // { path: 'main-screen', loadChildren: () => import('./features/main screen/mainscreen.module').then(m => m.mainscreenModule)},

  // { path: 'branch', loadChildren: () => import('./features/branch/branch.module').then(m => m.BranchModule) },
  // { path: 'represent', loadChildren: () => import('./features/representative/representative.module').then(m => m.RepresentativeModule)},
  //{ path: 'order', loadChildren: () => import('./features/order/order.module').then(m => m.OrderModule)},
  // { path: 'mainscreen', loadChildren: () => import('./features/main screen/mainscreen.module').then(m=>m.mainscreenModule)},
  //{ path: '', redirectTo: '', pathMatch: 'full' },
  
  {
    path:'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),canActivate:[loginGuard]
  },
  {
    path:'',
    loadChildren: () => import('./features/main screen/mainscreen.module').then(m => m.mainscreenModule),canActivate:[authGuard],
  },

  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

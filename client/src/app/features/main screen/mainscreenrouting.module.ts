import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { MerchantGuard } from '../../guards/merchant.guard';
import { RepresentativeGuard } from '../../guards/representative.guard';
import { EmployeeGuard } from '../../guards/employee.guard';

const routes: Routes = [
  { path: '', 
    component: DashbaordComponent,
    children:[
      {path:'merchant',loadChildren:()=>import('../merchant/merchants.module').then(m=>m.MerchantsModule),canActivate:[MerchantGuard]},
      {path:'representative',loadChildren:()=>import('../representative/representative.module').then(m=>m.RepresentativeModule),canActivate:[RepresentativeGuard]},
      {path:'employee',loadChildren:()=>import('../employee/employee.module').then(m=>m.EmployeeModule),canActivate:[EmployeeGuard]},
    ]
    
  },
 //representative
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainscreenroutingModule { }
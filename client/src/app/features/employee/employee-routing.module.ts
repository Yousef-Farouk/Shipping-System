import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MerchantListComponent } from '../merchant/merchant-list/merchant-list.component';
import { RepresentativeTableComponent } from '../representative/representative-table/representative-table.component';
import { EmployeeMainScreenComponent } from '../main screen/employee-mainscreen/employee-mainscreen.component';

const routes: Routes = [
  {path: '', component:EmployeeMainScreenComponent},
  {path: 'all', component:EmployeeListComponent},
  {path: 'add', component:AddEmployeeComponent},
  {path: 'edit/:id',component:AddEmployeeComponent},
  {path:'merchant/all',component:MerchantListComponent},
  {path:'representative/all',component:RepresentativeTableComponent},
  {
    path : 'branch',
    loadChildren : () => import('../branch/branch.module').then(m => m.BranchModule)
  }
  ,
  {
    path : 'location',
    loadChildren : () => import('../governate/governate.module').then(m => m.GovernateModule)
  }
  ,
  {
    path : 'settings',
    loadChildren : () => import('../../modules/settings/settings.module').then(m => m.SettingsModule)
  }
  ,
  {
    path : 'groups',
    loadChildren : () => import('../admin/admin.module').then(m => m.AdminModule)
  }
  ,
  {
    path : 'orders',
    loadChildren : () => import('../order/order.module').then(m => m.OrderModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

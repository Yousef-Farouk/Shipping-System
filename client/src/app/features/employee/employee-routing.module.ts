import { SettingsModule } from './../../modules/settings/settings/settings.module';
import { OrderReportsComponent } from './../order/order-reports/order-reports.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MainScreenComponent } from '../main screen/mainscreen/mainscreen.component';
import { AddPrivilegeComponent } from '../admin/add-privilege/add-privilege.component';
import { ListGroupComponent } from '../admin/list-group/list-group.component';
import { BranchTableComponent } from '../branch/branch-table/branch-table.component';
import { MerchantListComponent } from '../merchant/merchant-list/merchant-list.component';
import { RepresentativeTableComponent } from '../representative/representative-table/representative-table.component';
import { CityComponent } from '../city/city/city.component';
import { GovernateComponentComponent } from '../governate/governate-component/governate-component.component';
import { ShippingTypeTableComponent } from '../../modules/settings/settings/shippingtype-table/shippingtype-table.component';
import { AllOrdersComponent } from '../order/all-orders/all-orders.component';

const routes: Routes = [
  {path: '', component:MainScreenComponent},
  {path: 'add', component:AddEmployeeComponent},
  {path: 'all', component:EmployeeListComponent},
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
    loadChildren : () => import('../../modules/settings/settings/settings.module').then(m => m.SettingsModule)
  }
  ,
   {
    path : 'groups',
    loadChildren : () => import('../admin/admin.module').then(m => m.AdminModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepresentativeTableComponent } from './representative-table/representative-table.component';
import { RepresentativeMainscreenComponent } from './representative-mainscreen/representative-mainscreen.component';
import { AllOrdersComponent } from '../../modules/representative-user/all-orders/all-orders.component';

const routes: Routes = [
  {path:'',component:RepresentativeMainscreenComponent},
  {path:'all',component:RepresentativeTableComponent},
  {path:'orders/all',component:AllOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepresentativeRoutingModule { }

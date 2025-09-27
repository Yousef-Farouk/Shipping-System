import { ShippingTypeTableComponent } from './shippingtype-table/shippingtype-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VillageCostComponent } from './village-cost/village-cost.component';
import { WeightComponent } from './weight/weight.component';
import { premissionGuard } from '../../guards/premission.guard';
import { Actions, Permissions } from '../shared/Enums/rolesEnum';
import { PrivilegeService } from '../shared/services/privilege.service';

const routes: Routes = [

  { path: 'village', component :VillageCostComponent,data:{'premission':Permissions.Settings,'action':Actions.View},canActivate:[premissionGuard]},
  { path : 'shipping',component :ShippingTypeTableComponent},
  {path:'weight',component :WeightComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

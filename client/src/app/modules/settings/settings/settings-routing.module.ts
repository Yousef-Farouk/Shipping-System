import { ShippingTypeTableComponent } from './shippingtype-table/shippingtype-table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VillageCostComponent } from './village-cost/village-cost.component';
import { WeightComponent } from './weight/weight.component';

const routes: Routes = [

  { path: 'village', component :VillageCostComponent},
  { path : 'shipping',component :ShippingTypeTableComponent},
  {path:'weight',component :WeightComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

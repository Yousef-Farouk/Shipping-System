import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { VillageCostComponent } from './village-cost/village-cost.component';
import { ShippingTypeTableComponent } from './shippingtype-table/shippingtype-table.component';
import { WeightComponent } from './weight/weight.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { MatLabel } from '@angular/material/form-field';


@NgModule({
  declarations: [
    VillageCostComponent,
    ShippingTypeTableComponent,
    WeightComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatLabel
  ]
})
export class SettingsModule { }

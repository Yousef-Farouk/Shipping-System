import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GovernateComponentComponent } from './governate-component/governate-component.component';
import { GovernateRoutingModule } from './governate-routing.module';
import { GovernateComponent } from './governate/governate.component';
import { SharedModule } from '../../shared/shared.module';
import { FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CityComponent } from '../city/city/city.component';
import { CityTableComponent } from '../city/city-table/city-table.component';

@NgModule({
  declarations: [
    GovernateComponentComponent,
    GovernateComponent,
    CityComponent,
    CityTableComponent
  ],
  imports: [
    CommonModule,
    GovernateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports:[

  ]
})
export class GovernateModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityRoutingModule } from './city-routing.module';
import { CityTableComponent } from './city-table/city-table.component';
import { CityComponent } from './city/city.component';
import { GovernateModule } from '../governate/governate.module';
import { FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../modules/shared/shared.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CityModule { }

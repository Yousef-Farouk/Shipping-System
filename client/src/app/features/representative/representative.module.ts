import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepresentativeRoutingModule } from './representative-routing.module';
import { RepresentativeTableComponent } from './representative-table/representative-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RepresentativeMainscreenComponent } from './representative-mainscreen/representative-mainscreen.component';
import { AllOrdersComponent } from '../../modules/representative-user/all-orders/all-orders.component';

@NgModule({
  declarations: [RepresentativeTableComponent, RepresentativeMainscreenComponent,AllOrdersComponent],
  imports: [
    CommonModule,
    RepresentativeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  exports: [],
})
export class RepresentativeModule {}

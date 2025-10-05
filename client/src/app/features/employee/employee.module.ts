import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { BranchModule } from '../branch/branch.module';
import { MatFormField, MatFormFieldControl, MatLabel } from "@angular/material/form-field";
import { MatSelectTrigger, MatSelect } from "@angular/material/select";
import { MatOptionModule, MatOption } from "@angular/material/core";
import { EmployeeMainScreenComponent } from '../main screen/employee-mainscreen/employee-mainscreen.component';


@NgModule({
  declarations: [AddEmployeeComponent,EmployeeListComponent,EmployeeMainScreenComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BranchModule,
    MatOption,
    MatFormField,
    MatLabel,
    MatSelect,
    MatSelectTrigger
]
})
export class EmployeeModule { }

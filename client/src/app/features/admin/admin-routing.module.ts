import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminModule } from './admin.module';
import { AddPrivilegeComponent } from './add-privilege/add-privilege.component';
import { ListGroupComponent } from './list-group/list-group.component';

const routes: Routes = [
  { path: '', component: ListGroupComponent },
  { path: 'add', component: AddPrivilegeComponent },
  { path: 'edit/:id', component: AddPrivilegeComponent },

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

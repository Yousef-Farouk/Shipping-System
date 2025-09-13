import { GovernateComponentComponent } from './governate-component/governate-component.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GovernateComponent } from './governate/governate.component';
import { CityComponent } from '../city/city/city.component';

const routes: Routes = [
  { path: 'governate', component: GovernateComponentComponent },
  { path: 'city', component: CityComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovernateRoutingModule { }
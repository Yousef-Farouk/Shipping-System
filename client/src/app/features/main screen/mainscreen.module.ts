import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainscreenroutingModule } from './mainscreenrouting.module';
import { HomePageComponent } from '../home/home-page/home-page.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  declarations: [
    HomePageComponent,
    DashbaordComponent
  ],
  imports: [
    CommonModule,
    MainscreenroutingModule,
    SharedModule
  ],

  exports:[]
})
export class mainscreenModule { }
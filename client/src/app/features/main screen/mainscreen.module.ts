import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainScreenComponent } from './mainscreen/mainscreen.component';
import { MainscreenroutingModule } from './mainscreenrouting.module';
import { HomePageComponent } from '../home/home-page/home-page.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  declarations: [
    MainScreenComponent,
    HomePageComponent,
    DashbaordComponent
  ],
  imports: [
    CommonModule,
    MainscreenroutingModule,
    SharedModule
  ],

  exports:[MainScreenComponent]
})
export class mainscreenModule { }
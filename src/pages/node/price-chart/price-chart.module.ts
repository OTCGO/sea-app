import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriceChartPage } from './price-chart';
import { NodePageModule } from '../node.module'

@NgModule({
  declarations: [
    PriceChartPage,
  ],
  imports: [
    IonicPageModule.forChild(PriceChartPage),
    NodePageModule
  ],
})
export class PriceChartPageModule { }

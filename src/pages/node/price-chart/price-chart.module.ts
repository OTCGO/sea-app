import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriceChartPage } from './price-chart';

@NgModule({
  declarations: [
    PriceChartPage,
  ],
  imports: [
    IonicPageModule.forChild(PriceChartPage),
  ],
})
export class PriceChartPageModule {}

import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { MarketDetailPage } from './market-detail'
import {
	MarketDetailCard,
	MarketDetailChart
} from '../../../components/markets/market-detail'


console.log(MarketDetailCard, MarketDetailChart)


@NgModule({
	declarations: [
		MarketDetailPage,
		MarketDetailCard,
		MarketDetailChart
	],
	imports: [
		IonicPageModule.forChild(MarketDetailPage)
	]
})
export class MarketDetailModule {}

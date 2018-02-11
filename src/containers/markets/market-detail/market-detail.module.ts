import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { MarketDetailPage } from './market-detail'

const COMPONENT = [
	MarketDetailPage
]

@NgModule({
	declarations: COMPONENT,
	imports: [IonicPageModule.forChild(MarketDetailPage)],
	exports: COMPONENT
})
export class MarketDetailModule {}

import { Component } from '@angular/core'
import { IonicPage, NavParams } from 'ionic-angular'

@IonicPage({
	name: 'MarketDetail',
	segment: 'market-detail'
})
@Component({
	selector: 'page-market-detail',
	templateUrl: 'market-detail.html'
})

export class MarketDetailPage {
	coin = this.navParams.data.coin
	perGas = this.navParams.data.perGas

	constructor (public navParams: NavParams) {}

}
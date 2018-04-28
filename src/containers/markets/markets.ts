import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
	IonicPage, NavController, NavParams, Refresher
} from 'ionic-angular'

import { RootState } from '../../store/reducers'
import { PriceProvider, NotificationProvider, LoadingProvider } from '../../providers'

import { MarketsActions } from '../../store/actions'
import { SettingsSelectors, MarketsSelectors, PricesSelectors } from '../../store/selectors'

@IonicPage({ name: 'Markets' })
@Component({
	selector: 'page-markets',
	templateUrl: 'markets.html',
})
export class MarketsPage implements OnInit {
	coins
	GASPrice
	exchangeRates
	oCurrency

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private priceProvider: PriceProvider,
		private np: NotificationProvider,
		private lp: LoadingProvider,
		private store: Store<RootState>
	) {}

	ngOnInit () {
		this.initData()
	}

	async initData () {
		this.store.select(MarketsSelectors.getError).subscribe(error => this.np.emit({ message: error }))
		this.store.select(MarketsSelectors.getLoading).subscribe(loading => this.lp.emit(loading))
		this.store.select(MarketsSelectors.getEntities).subscribe(markets => this.coins = markets)
		this.store.select(SettingsSelectors.getCurrency).subscribe(currency => this.oCurrency = currency)
		this.store.select(PricesSelectors.getEntities).subscribe(prices => this.GASPrice = prices['GAS'] || 1)

		this.priceProvider.getExchangeRates().then(res => this.exchangeRates = res['rates']).catch(console.log)
	}

	doRefresh (refresher: Refresher) {
		this.store.dispatch(new MarketsActions.Load())

		this.priceProvider.getExchangeRates()
				.then(res => this.exchangeRates = res['rates'])
				.catch(error => this.np.emit({ message: error }))

		this.store.select(MarketsSelectors.getLoading)
				.subscribe(loading => !loading && refresher.complete())
	}

	handleCoinClick (coin) {
		this.store.dispatch(new MarketsActions.Select(coin.symbol))
		this.navCtrl.push('MarketDetail', { coin, perGas: this.GASPrice / coin.currentPrice })
	}

	// TODO: Unuse function
	/*calculateRate (price: number) {
		const strPrice = (price / this.GASPrice).toString()

		const splitStr: Array<string> | string = /./.test(strPrice)
			? strPrice.split('.')
			: strPrice

		if (splitStr[1]) {
			const subStr = splitStr[1].substr(0, 4)
			return `${splitStr[0]}.${subStr}`
		}

		return splitStr.join('')
	}*/
}

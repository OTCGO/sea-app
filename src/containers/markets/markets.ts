import { Component } from '@angular/core'
import {
	IonicPage, Loading, LoadingController, NavController, NavParams, Refresher,
	ToastController
} from 'ionic-angular'
import { PriceProvider } from '../../providers/api/price.provider'
import { ApiProvider } from '../../providers/api/api.provider'
import { MarketDetailPage } from './market-detail/market-detail'


@IonicPage()
@Component({
	selector: 'page-markets',
	templateUrl: 'markets.html',
})
export class MarketsPage {
	coins
	loading: Loading
	GASPrice
	exchangeRates
	marketDetailPage = MarketDetailPage

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private neoPriceProvider: PriceProvider,
		private toastCtrl: ToastController,
		private loadingCtrl: LoadingController
	) {}

	ionViewDidLoad () {
		this.initData()
	}

	async initData () {
		this.loading = this.loadingCtrl.create()
		this.loading.present()

		this.neoPriceProvider.getPrices().then(
			coins => {
				this.coins = coins
				this.GASPrice = this.coins.find(coin => coin['symbol'] === 'GAS').currentPrice
				this.loading.dismiss()
			}
		).catch(err => {
			this.loading.dismiss()
			this.toastCtrl.create({ message: '对不起，找不到数据！'+err, duration: 4000 }).present()
			console.log(err)
		})

		this.neoPriceProvider.getExchangeRates().then(res => this.exchangeRates = res['rates'])
	}

	calculateRate (price: number) {
		const strPrice = (price / this.GASPrice).toString()

		const splitStr: any = strPrice.includes('.')
			? strPrice.split('.')
			: strPrice

		if (splitStr[1]) {
			const subStr = splitStr[1].substr(0, 4)
			return `${splitStr[0]}.${subStr}`
		}

		return splitStr.join('')
	}

	doRefresh (refresher: Refresher) {
		this.neoPriceProvider.getPrices().then(
			coins => {
				this.coins = coins
				this.GASPrice = this.coins.find(coin => coin['symbol'] === 'GAS').currentPrice
				refresher.complete()
				const toast = this.toastCtrl.create({
					message: '行情数据已更新！',
					duration: 3000
				});
				toast.present();
			}
		)

		this.neoPriceProvider.getExchangeRates().then(res => this.exchangeRates = res['rates'])
	}
}

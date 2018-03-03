import { Component, OnInit } from '@angular/core'
import {
	IonicPage, Loading, LoadingController, NavController, NavParams, Refresher
} from 'ionic-angular'
import { PriceProvider } from '../../providers/api/price.provider'
import { MarketDetailPage } from './market-detail/market-detail'
import { api } from '../../libs/neon'
import { NotificationProvider } from '../../providers/notification.provider'

@IonicPage()
@Component({
	selector: 'page-markets',
	templateUrl: 'markets.html',
})
export class MarketsPage implements OnInit {
	coins
	loading: Loading
	GASPrice
	exchangeRates
	marketDetailPage = MarketDetailPage

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private priceProvider: PriceProvider,
		private notificationProvider: NotificationProvider,
		private loadingCtrl: LoadingController
	) {}

	ngOnInit () {
		this.initData()
	}

	async initData () {
		this.loading = this.loadingCtrl.create()
		this.loading.present()

		api.cmc.getMarkets(PriceProvider.NEO_CHAIN_COINS,  'cny')
		    .then(
			    coins => {
				    console.log('expect cny price', coins)
				    this.coins = coins
				    this.GASPrice = this.coins.find(coin => coin['symbol'] === 'GAS').currentPrice
				    this.loading.dismiss()
			    }
		    )
		    .catch(err => {
			    this.loading.dismiss().then(_ => {
				    this.notificationProvider.emit({ message: '对不起，找不到数据！' + err})
			    })
		    })

		this.priceProvider.getExchangeRates().then(res => this.exchangeRates = res['rates'])
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
		api.cmc.getMarkets(PriceProvider.NEO_CHAIN_COINS, 'cny')
		   .then(
			   coins => {
				   this.coins = coins
				   this.GASPrice = this.coins.find(coin => coin['symbol'] === 'GAS').currentPrice
				   refresher.complete()
				   this.notificationProvider.emit({
					   message: '行情数据已更新！',
					   duration: 3000
				   })
			   }
		   )
		   .catch(err => {
			   this.loading.dismiss().then(_ => {
				   this.notificationProvider.emit({ message: '对不起，找不到数据！' + err})
				   console.log(err)
			   })
		   })

		this.priceProvider.getExchangeRates().then(res => this.exchangeRates = res['rates'])
	}
}

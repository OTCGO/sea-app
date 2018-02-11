import { Component, OnInit } from '@angular/core'
import {
	IonicPage, Loading, LoadingController, NavController, Refresher,
	ToastController
} from 'ionic-angular'

import { PossessionDetailPage } from './possession-detail/possession-detail'
import { WalletProvider } from '../../providers/wallet/wallet.provider'

import { PossessionsProvider } from './possessions.provider'


@IonicPage({
	name: 'Possessions',
	segment: 'possessions'
})
@Component({
	selector: 'page-possessions',
	templateUrl: 'possessions.html'
})
export class PossessionsPage implements OnInit {
	splash: boolean = false
	possessionDetailPage = PossessionDetailPage

	balances
	account = this.possessionsProvider.account
	loading: Loading = this.loadingCtrl.create()

	constructor (
		public navCtrl: NavController,
		private toastCtrl: ToastController,
		private walletProvider: WalletProvider,
		private loadingCtrl: LoadingController,
		private possessionsProvider: PossessionsProvider,
	) {}

	ionViewCanEnter () {
		return this.walletProvider.haveAnAccount()
	}

	ngOnInit () {
		this.loading.present()
		this.initData()
	}

	initData () {
		this.possessionsProvider.getBalances().then(bals => this.balances = bals).catch(console.log)
		this.loading.dismiss()
	}

	doRefresh (e: Refresher) {
		this.possessionsProvider.getBalances().then(bals => this.balances = bals).catch(console.log)
		e.complete()
	}

	showMsg (message) {
		const toast = this.toastCtrl.create({
			message,
			duration: 2000
		})

		return toast.present()
	}


	openQRCode () {
		this.navCtrl.push('payment-qrcode', { address: this.account.address })
	}
}

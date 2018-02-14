import { Component, OnInit } from '@angular/core'
import {
	IonicPage, Loading, LoadingController, NavController, Refresher,
	ToastController
} from 'ionic-angular'

import { Observable } from 'rxjs'

import { Store } from '@ngrx/store'

import { PossessionDetailPage } from './possession-detail/possession-detail'
import { WalletProvider } from '../../providers/wallet/wallet.provider'

import * as fromBalances from '../../reducers/balances.reducer'
import * as balancesAction from '../../actions/balances.action'
import { BalancesState } from '../../reducers/balances.reducer'
import { AccountProvider } from '../../providers/account/account.provider'

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

	balances$: Observable<any[]>
	account = this.accountProvider.defaultAccount
	loading: Loading = this.loadingCtrl.create()

	constructor (
		public navCtrl: NavController,
		private toastCtrl: ToastController,
		private walletProvider: WalletProvider,
		private loadingCtrl: LoadingController,
		private accountProvider: AccountProvider,
		private store: Store<BalancesState>
	) {}

	ionViewCanEnter () {
		return this.walletProvider.hasAccounts()
	}

	async ngOnInit () {
		await this.loading.present()
		this.balances$ = this.store.select(fromBalances.getBalances)
		this.store.select(fromBalances.getError).subscribe(
			error => error && this.showMsg(error)
		)
		console.log('magic')
		this.store.dispatch(new balancesAction.Get(this.account.address))

		await this.loading.dismiss()
	}

	doRefresh (e: Refresher) {
		this.store.dispatch(new balancesAction.Get(this.account.address))
		this.showMsg('刷新成功！')
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

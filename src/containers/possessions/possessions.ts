import { Component, OnInit } from '@angular/core'
import {
	IonicPage,
	Loading,
	LoadingController,
	NavController,
	Refresher
} from 'ionic-angular'

import { Store } from '@ngrx/store'
import { LoadingProvider, WalletProvider, AccountProvider, NotificationProvider } from '../../providers'

import { PossessionDetailPage } from './possession-detail/possession-detail'

import * as fromBalances from '../../store/reducers/balances.reducer'
import * as balancesAction from '../../store/actions/balances.action'
import { State } from '../../store/reducers/balances.reducer'



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
	account = this.accountProvider.defaultAccount
	loading: Loading
	balances: Array<any>


	constructor (
		public navCtrl: NavController,
		private walletProvider: WalletProvider,
		private loadingCtrl: LoadingController,
		private accountProvider: AccountProvider,
		private notificationProvider: NotificationProvider,
		private lp: LoadingProvider,
		private store: Store<State>
	) {}

	ionViewCanEnter () {
		return this.walletProvider.hasAccounts()
	}

	ngOnInit () {
		this.loadBalance()
	}

	async presentLoading () {
		this.loading = this.loadingCtrl.create()
		await this.loading.present()
	}

	loadBalance () {
		this.store.dispatch(new balancesAction.Get(this.account.address))
		this.store.select(fromBalances.getEntities)
				.subscribe(balances => this.balances = balances)
		this.store.select(fromBalances.getLoading)
				.subscribe(loading => this.lp.emit(loading))

		this.store.select(fromBalances.getError).subscribe(
			error =>
				error && this.notificationProvider
										 .emit({
											 message: error
										 })
		)

	}

	doRefresh (refresher: Refresher) {
		this.store.dispatch(new balancesAction.Get(this.account.address))
		this.store.select(fromBalances.getLoading)
				.subscribe(loading => !loading && refresher.complete())

	}
}

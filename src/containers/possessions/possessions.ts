import { Component, OnInit } from '@angular/core'
import {
	IonicPage,
	Loading,
	LoadingController,
	NavController,
	Refresher
} from 'ionic-angular'

import { select, Store } from '@ngrx/store'

import { PossessionDetailPage } from './possession-detail/possession-detail'
import { WalletProvider } from '../../providers/wallet/wallet.provider'

import * as fromBalances from '../../reducers/balances.reducer'
import * as balancesAction from '../../actions/balances.action'
import { BalancesState } from '../../reducers/balances.reducer'
import { AccountProvider } from '../../providers/account/account.provider'
import { NotificationProvider } from '../../providers/notification.provider'

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
	loading: Loading = this.loadingCtrl.create()
	balances$ = this.store.pipe(select(fromBalances.selectEntities));


	constructor (
		public navCtrl: NavController,
		private walletProvider: WalletProvider,
		private loadingCtrl: LoadingController,
		private accountProvider: AccountProvider,
		private notificationProvider: NotificationProvider,
		private store: Store<BalancesState>
	) {}

	ionViewCanEnter () {
		return this.walletProvider.hasAccounts()
	}

	async ngOnInit () {
		await this.loading.present()
		this.loadBalance()
		await this.loading.dismiss()
	}

	loadBalance () {
		this.store.dispatch(new balancesAction.Get(this.account.address))
		this.store.select(fromBalances.selectError).subscribe(
			error => error && this.notificationProvider.emit({ message: error })
		)
	}

	doRefresh (e: Refresher) {
		this.store.dispatch(new balancesAction.Get(this.account.address))
		this.notificationProvider.emit({ message:'刷新成功！' })
		e.complete()
	}
}

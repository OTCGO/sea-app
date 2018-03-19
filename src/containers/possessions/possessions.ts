import { Component, OnInit } from '@angular/core'
import {
	IonicPage,
	Loading,
	LoadingController,
	NavController,
	Refresher
} from 'ionic-angular'

import { Store } from '@ngrx/store'
import { LoadingProvider, NotificationProvider } from '../../providers'
import { BalancesActions } from '../../store/actions'
import { WalletSelectors, BalancesSelectors } from '../../store/selectors'
import { fromBalances, fromWallet } from '../../store/reducers'


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
	account = this.store.select(WalletSelectors.getAccount)
	loading: Loading
	balances: Array<any>
	exits: boolean

	constructor (
		public navCtrl: NavController,
		private loadingCtrl: LoadingController,
		private notificationProvider: NotificationProvider,
		private lp: LoadingProvider,
		private store: Store<fromBalances.State | fromWallet.State>
	) {}

	ionViewCanEnter () {
		return this.exits
	}

	ngOnInit () {
		this.loadBalance()
		this.store.select(WalletSelectors.getExits).subscribe(exits => this.exits = exits)
	}

	loadBalance () {
		this.store.dispatch(new BalancesActions.Load())

		this.store
				.select(BalancesSelectors.getEntities)
				.subscribe(balances => this.balances = balances)
		this.store
				.select(BalancesSelectors.getLoading)
				.subscribe(loading => this.lp.emit(loading))
		this.store
				.select(BalancesSelectors.getError)
				.subscribe(error => error && this.notificationProvider.emit({ message: error }))

	}

	doRefresh (refresher: Refresher) {
		this.store.dispatch(new BalancesActions.Load())
		this.store
				.select(BalancesSelectors.getLoading)
				.subscribe(loading => !loading && refresher.complete())

	}

	handleBalanceClick (symbol) {
		this.store.dispatch(new BalancesActions.Select(symbol))
	}
}

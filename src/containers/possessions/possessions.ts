import {
	Component,
	OnDestroy,
	OnInit
} from '@angular/core'
import {
	IonicPage,
	NavController,
	Refresher
} from 'ionic-angular'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { IBalance } from '../../shared/models'
import { LoadingProvider, NotificationProvider } from '../../providers'
import { BalancesActions } from '../../store/actions'
import { WalletSelectors, BalancesSelectors } from '../../store/selectors'
import { fromBalances, fromWallet } from '../../store/reducers'

import 'rxjs/add/operator/distinctUntilChanged'


@IonicPage({
	name: 'Possessions',
	segment: 'possessions'
})
@Component({
	selector: 'page-possessions',
	templateUrl: 'possessions.html'
})
export class PossessionsPage implements OnInit, OnDestroy {
	exits: boolean
	account = this.store.select(WalletSelectors.getAccount)
	balances: Observable<IBalance[]> = this.store.select(BalancesSelectors.getEntities)
	selectedBalanceSubscriber: Subscription

	constructor (
		public navCtrl: NavController,
		private notificationProvider: NotificationProvider,
		private lp: LoadingProvider,
		private store: Store<fromBalances.State | fromWallet.State>
	) {}

	ionViewCanEnter () {
		return this.exits
	}

	ngOnInit () {
		this.store.dispatch(new BalancesActions.Load())

		this.store
				.select(BalancesSelectors.getLoading)
				.subscribe(loading => this.lp.emit(loading))
		this.store
				.select(BalancesSelectors.getError)
				.subscribe(error => error && this.notificationProvider.emit({ message: error }))

		this.store.select(WalletSelectors.getExits).subscribe(exits => this.exits = exits)
	}

	ngOnDestroy () {
		console.log('destroy call')
	}

	ionViewWillLeave () {
		this.selectedBalanceSubscriber.unsubscribe()
	}

	doRefresh (refresher: Refresher) {
		this.store.dispatch(new BalancesActions.Load())
		this.store
				.select(BalancesSelectors.getLoading)
				.subscribe(loading => !loading && refresher.complete())

	}

	handleBalanceSelect (symbol) {
		this.store.dispatch(new BalancesActions.Select(symbol))
		this.selectedBalanceSubscriber = this.store.select(BalancesSelectors.getSelectedBalance)
			.distinctUntilChanged()
			.subscribe(selectedBalance => {
				selectedBalance && this.navCtrl.push('PossessionDetail')
			})
	}
}

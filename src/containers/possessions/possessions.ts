import {
	Component,
	OnInit
} from '@angular/core'
import {
	IonicPage,
	NavController,
	Refresher,
	Platform,
	LoadingController,
} from 'ionic-angular'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/take'
import { interval } from 'rxjs/observable/interval'

import { IBalance } from '../../shared/models'
import { Account } from '../../shared/typings'
import { LoadingProvider, NotificationProvider } from '../../providers'
import { BalancesActions } from '../../store/actions'
import { WalletSelectors, BalancesSelectors, SettingsSelectors } from '../../store/selectors'
import { fromBalances, fromWallet } from '../../store/reducers'
import { balanceSort } from '../../shared/utils'

@IonicPage({
	name: 'Possessions',
	segment: 'possessions'
})
@Component({
	selector: 'page-possessions',
	templateUrl: 'possessions.html'
})
export class PossessionsPage implements OnInit {
	exits: boolean
	balances: Observable<IBalance[]>
	account: Observable<Account> = this.store.select(WalletSelectors.getAccount)
	// amount: Observable<number> = this.store.select(PricesSelectors.getDefaultAccountAmount)
	// baseCurrency: Observable<string> = this.store.select(SettingsSelectors.getCurrency)
	selectedBalanceSubscriber: Subscription
	private balancesInterval: Subscription
	private balancess

	get displayZero () { return this._displayZero }
	set displayZero (val) {
		this.switchBalances(val)
		this._displayZero = val
	}
	//
	private _displayZero = false


	constructor (
		private platform: Platform,
		public navCtrl: NavController,
		private notificationProvider: NotificationProvider,
		private lp: LoadingProvider,
		private loadingCtrl: LoadingController,
		private store: Store<fromBalances.State | fromWallet.State>
	) {}

	ionViewCanEnter = () => this.exits

	ngOnInit () {

		const loading = this.loadingCtrl.create()

		loading.present()

		this.switchBalances()
		this.updateBalances()
    	// this.store.select(SettingsSelectors.getCurrency).subscribe(() => this.updateBalances())
		this.store.select(BalancesSelectors.getLoading).subscribe(() => {
			loading.dismiss().catch(() => { }).catch(() => { })
		})
		// this.store.select(BalancesSelectors.getError).subscribe(error => error && this.notificationProvider.emit({ message: error }))
		this.store.select(WalletSelectors.getExits).subscribe(exits => this.exits = exits)

		// this.balances.subscribe(data => {
		// 	// console.log('handleDisplayZeroClick', data)
		// 	console.log('data', data)
		// 	this.balancess = balanceSort(data)
		// 	console.log('this.balancess', this.balancess)
		// })


	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad')
	}
	ionViewWillLeave() {
		console.log('ionViewWillLeave')
		this.balancesInterval.unsubscribe()
	}

	// ionViewCanLeave() {
	// 	console.log('ionViewDidLeave')
	// 	this.balancesInterval.unsubscribe()
	//  }

	ionViewDidEnter() {
		console.log('ionViewDidEnter')
		this.balancesInterval = interval(20000).subscribe(val => {
			this.store.dispatch(new BalancesActions.Load())
		})

	}
	updateBalances () {
		console.log('updateBalances')
		this.store.dispatch(new BalancesActions.Load())
		// 20000



		this.platform.ready().then(() => {

			    document.addEventListener('resume', () => {

			        console.log('resume') // 进入，前台展示
					this.balancesInterval = interval(20000).subscribe(val => {
						this.store.dispatch(new BalancesActions.Load())
					})

			    }, false)

			    document.addEventListener('pause', () => {

			        console.log('pause') // 退出，后台运行
					this.balancesInterval.unsubscribe()


			    }, false)

			})



	// this.store.dispatch(new MarketsActions.Load())


  }

	switchBalances (displayZero: boolean = false) {
		this.balances = displayZero
			? this.store.select(BalancesSelectors.getDefaultEntities).distinctUntilChanged()
			: this.store.select(BalancesSelectors.getDefaultNonZeroEntities).distinctUntilChanged()
	}

	doRefresh (refresher: Refresher) {
		this.store.dispatch(new BalancesActions.Load())
    	// this.store.dispatch(new MarketsActions.Load())
		this.store.select(BalancesSelectors.getLoading).subscribe(loading => !loading && refresher.complete())
  }

	handleBalanceSelect (symbol) {
		console.log('handleBalanceSelect:symbol', symbol)
		this.store.dispatch(new BalancesActions.Select(symbol))
		this.navCtrl.push('PossessionDetail')
		// this.selectedBalanceSubscriber = this.store.select(BalancesSelectors.getSelectedBalance).take(1)
        //                                .subscribe(selectedBalance => {
		// 								   if (selectedBalance) {
		// 									this.navCtrl.push('PossessionDetail')
		// 							   	}}
		// 							)
	}

	handleDisplayZeroClick (bool: false) {

		// console.log('PossessionsListComponent', this.balances.subscribe(data => {
		// 	console.log('handleDisplayZeroClick', data)
		// }))

		this.displayZero = bool
	}

	// ionViewCanLeave() {
	// 	this.subscription.unsubscribe()

	// }
}

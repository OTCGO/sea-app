
import { Component, NgZone, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import {
	NavParams,
	IonicPage,
	NavController,
	ModalController,
	LoadingController,
	ScrollEvent,
} from 'ionic-angular'
import { LoadingProvider } from '../../../providers'
import { RootState } from '../../../store/reducers'
import { TransactionHistorySelectors, PricesSelectors } from '../../../store/selectors'
import * as TransactionHistoryAction from '../../../store/actions/transaction-history.action'
import { PossessionDetailProvider } from './possession-detail.provider'

interface TransactionHistory {
	assetId
	amount
	dest
	confirm
	txid
	name
}

@IonicPage({
	name: 'PossessionDetail'
})
@Component({
	selector: 'page-possession-detail',
	templateUrl: 'possession-detail.html',
})
export class PossessionDetailPage {
	balance
	transactionHistories: TransactionHistory[] = []
	loading
	totalValue

	isScrollUp: boolean
	isScrollDown: boolean

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private modalCtrl: ModalController,
		private loadingCtrl: LoadingController,
		private possessionDetailProvider: PossessionDetailProvider,
		private lp: LoadingProvider,
		private store: Store<RootState>,
		private zone: NgZone
	) {}

	ngOnInit () {

		/*this.loading = this.loadingCtrl.create()
		this.loading.present()*/

		this.balance = this.navParams.data

		this.store.dispatch(new TransactionHistoryAction.Load(this.balance))

		this.store
				.select(TransactionHistorySelectors.getEntities)
				.subscribe(histories => this.transactionHistories = histories)

		this.store
				.select(PricesSelectors.getEntities)
				.subscribe(prices => this.totalValue = this.balance.amount.times(prices[this.balance.symbol] || 0))

		/*this.possessionDetailProvider
				.getHistories(this.balance.symbol)
				.then(histories => {
					this.transactionHistories = histories
				})
				.then(_=> this.loading.dismiss())*/
	}

	ionViewWillLeave () {
		this.transactionHistories = []
	}

	showSendModal () {
		const possessionData = {
			hash: this.balance.hash,
			symbol: this.balance.symbol,
			amount: this.balance.amount.toNumber()
		}

		const sendModal = this.modalCtrl.create(
			'SendModal',
			possessionData,
			{ cssClass: 'inset-modal' }
		)
		sendModal.present()
	}

	handleScroll (e: ScrollEvent) {
		if (e.directionY === 'down') {
			this.zone.run(() => {
				this.isScrollDown = true
				this.isScrollUp = false
			})
		}
		if (e.directionY === 'up' && e.scrollTop === 0) {
			this.zone.run(() => {
				this.isScrollDown = false
				this.isScrollUp = true
			})
		}
	}
}


import { Component, NgZone } from '@angular/core'
import { Store } from '@ngrx/store'
import {
	NavParams,
	IonicPage,
	NavController,
	ModalController,
	LoadingController,
	ScrollEvent,
} from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { empty } from 'rxjs/observable/empty'
import { IBalance } from '../../../shared/models'
import { LoadingProvider } from '../../../providers'
import { RootState } from '../../../store/reducers'
import { BalancesSelectors, TransactionHistorySelectors, PricesSelectors } from '../../../store/selectors'
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
	balance: Observable<IBalance> = this.store.select(BalancesSelectors.getSelectedBalance)
	transactionHistories: Observable<TransactionHistory[]> = this.store.select(TransactionHistorySelectors.getEntities)
	price: Observable<string> = this.store.select(PricesSelectors.getPrice)

	isScrollUp: boolean
	isScrollDown: boolean

	constructor (
		private lp: LoadingProvider,
		private zone: NgZone,
		private store: Store<RootState>,
		private modalCtrl: ModalController,
	) {}

	ngOnInit () {
		this.store.dispatch(new TransactionHistoryAction.Load())
	}

	ionViewWillLeave () {
		this.transactionHistories = empty()
	}

	showSendModal () {
		const sendModal = this.modalCtrl.create(
			'SendModal',
			null,
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

import { Component, NgZone } from '@angular/core'
import { Store } from '@ngrx/store'
import {
	IonicPage,
	ScrollEvent,
} from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { empty } from 'rxjs/observable/empty'
import { IBalance } from '../../../shared/models'
import { LoadingProvider } from '../../../providers'
import { RootState } from '../../../store/reducers'
import { BalancesSelectors, TransactionHistorySelectors, PricesSelectors } from '../../../store/selectors'
import * as TransactionHistoryAction from '../../../store/actions/transaction-history.action'

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
	selectedPrice: Observable<number> = this.store.select(PricesSelectors.getSelectedPrice)
	selectedBalance: Observable<IBalance> = this.store.select(BalancesSelectors.getSelectedBalance)
	transactionHistories: Observable<TransactionHistory[]> = this.store.select(TransactionHistorySelectors.getEntitiesBySelectedSymbol)

	isScrollUp: boolean
	isScrollDown: boolean

	constructor (
		private lp: LoadingProvider,
		private zone: NgZone,
		private store: Store<RootState>,
	) {}

	ngOnInit () {
		this.store.dispatch(new TransactionHistoryAction.Load())
	}

	ionViewDidLeave () {
		this.transactionHistories = empty()
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

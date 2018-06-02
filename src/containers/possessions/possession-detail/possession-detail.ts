import {
	Component,
	NgZone,
	OnDestroy,
	OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import {
	IonicPage,
	ScrollEvent,
} from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { empty } from 'rxjs/observable/empty'
import { TransactionHistory, IBalance } from '../../../shared/models'
import { LoadingProvider } from '../../../providers'
import { RootState } from '../../../store/reducers'
import { BalancesSelectors, TransactionHistorySelectors, PricesSelectors } from '../../../store/selectors'
import { TransactionHistoryActions, BalancesActions } from '../../../store/actions'


@IonicPage({ name: 'PossessionDetail' })
@Component({
	selector: 'page-possession-detail',
	templateUrl: 'possession-detail.html',
})
export class PossessionDetailPage implements OnInit, OnDestroy {
	// selectedPrice: Observable<number> = this.store.select(PricesSelectors.getSelectedPrice)
	selectedBalance: Observable<IBalance> = this.store.select(BalancesSelectors.getSelectedBalance)
	transactionHistories: Observable<TransactionHistory[]> =  this.store.select(TransactionHistorySelectors.getEntitiesBySelectedSymbol)
	// isScrollUp: boolean
	// isScrollDown: boolean
	// scrollTop: number
	// differentScrollTop: number
	lastStack = []

	constructor (
		private lp: LoadingProvider,
		private zone: NgZone,
		private store: Store<RootState>,
	) {}

	ngOnInit () {
		this.store.dispatch(new TransactionHistoryActions.Load())
		console.log('ngOnInit')
		this.transactionHistories.subscribe(data => {
			console.log('ngOnInit:data', data)
		})
	}
	ngOnDestroy () { this.store.dispatch(new BalancesActions.CleanSelectedCoin() )}

	ionViewDidLeave () { this.transactionHistories = empty() }

	// handleScroll (e: ScrollEvent) {
	// 	const { scrollTop } = e
	// 	this.scrollTop = scrollTop
	// 	if (!this.differentScrollTop) this.differentScrollTop = scrollTop
	// 	this.lastStack.push(() => this.differentScrollTop = scrollTop)
	// 	if (this.lastStack.length >= 2) this.lastStack.shift().bind(this)()

	// 	if (e.directionY === 'down') {
	// 		this.zone.run(() => {
	// 			this.isScrollDown = true
	// 			this.isScrollUp = false
	// 		})
	// 	}
	// 	if (e.directionY === 'up') {
	// 		this.zone.run(() => {
	// 			this.isScrollDown = false
	// 			this.isScrollUp = true
	// 		})
	// 	}
	// }
}

import {
	Component,
	OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import { RootState } from '@store/reducers'
import { IonicPage } from 'ionic-angular'
import { LoadingProvider } from '../../../../providers'
import { VOut, TransactionHistoryDetail, TransactionHistory } from '../../../../shared/models'
import { TransactionHistoryActions } from '../../../../store/actions'
import { TransactionHistorySelectors } from '../../../../store/selectors'
import { compose, merge, pick, toPairs } from 'ramda'

interface Details {
	blocktime: number
	txid: string
	asset: string
	operation: string
	time: string
	symbol: string
	value: string
	vout: VOut[]
}


@IonicPage({ name: 'HistoryDetail' })
@Component({
	selector: 'page-history-detail',
	templateUrl: 'history-detail.html'
})
export class HistoryDetail implements OnInit {
	readonly translationPrefix = 'PROFILE.HISTORIES.DETAIL.'
	selectedHistory: TransactionHistory
	historyDetail: TransactionHistoryDetail
	browserLink = 'http://state.otcgo.cn/traninfo.html?id='

	get details (): Details {
		const partialDetail: {
			blocktime: number
			vout: VOut[]
		} = pick<any, 'blocktime' | 'vout'>(['blocktime', 'vout'], this.historyDetail || {})

		return merge(partialDetail, this.selectedHistory)
	}

	get blockHeight () { return this.details.blocktime }
	get operation () { return this.details.operation }
	get txid () { return this.details.txid }
	get amount () { return this.details.value }
	get symbol () { return this.details.symbol }
	get time () { return this.details.time }
	get address () { return this.details.vout && this.details.vout[0].address }
	get status () { return this.details.blocktime ? 'success' : 'pending' }


	constructor (
		private store: Store<RootState>,
		private lp: LoadingProvider,
	) { }

	ngOnInit () {
		this.store.dispatch(new TransactionHistoryActions.LoadDetail())
		this.store.select(TransactionHistorySelectors.getSelectedEntities).subscribe(selectedHistory => this.selectedHistory = selectedHistory)
		this.store.select(TransactionHistorySelectors.getDetail).subscribe(historyDetail => this.historyDetail = historyDetail)
		this.store.select(TransactionHistorySelectors.getLoading).subscribe(bool => this.lp.emit(bool))
	}

	handleOpenBrowserClick () {

  }
}

import {
	Component,
	OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import { RootState } from '@store/reducers'
import { IonicPage } from 'ionic-angular'
import { LoadingProvider } from '../../../../providers'
import { TransactionHistoryDetail, TransactionHistory } from '../../../../shared/models'
import { TransactionHistoryActions } from '../../../../store/actions'
import { TransactionHistorySelectors } from '../../../../store/selectors'

@IonicPage({
	name: 'HistoryDetail'
})
@Component({
	selector: 'page-history-detail',
	templateUrl: 'history-detail.html'
})
export class HistoryDetail implements OnInit {
	selectedHistory: TransactionHistory
	historyDetail: TransactionHistoryDetail

	constructor (
		private store: Store<RootState>,
		private lp: LoadingProvider,
	) { }

	ngOnInit () {
		this.store.dispatch(new TransactionHistoryActions.LoadDetail())
		this.store.select(TransactionHistorySelectors.getSelectedEntities)
				.subscribe(selectedHistory => this.selectedHistory = selectedHistory)
		this.store.select(TransactionHistorySelectors.getDetail)
				.subscribe(historyDetail => this.historyDetail = historyDetail)
		this.store.select(TransactionHistorySelectors.getLoading).subscribe(bool => this.lp.emit(bool))
		// this.store.dispatch(new AssetsActions.Load())
	}
}

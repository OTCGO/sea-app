import {
	Component,
	OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import { RootState } from '@store/reducers'
import { IonicPage } from 'ionic-angular'
import { LoadingProvider } from '../../../providers'
import { TransactionHistorySelectors } from '../../../store/selectors'
import { TransactionHistoryActions } from '../../../store/actions'



@IonicPage({
	name: 'Histories'
})
@Component({
	selector: 'page-histories',
	templateUrl: 'histories.html'
})
export class Histories implements OnInit {
	histories = this.store.select(TransactionHistorySelectors.getEntities)

	constructor (
		private store: Store<RootState>,
		private lp: LoadingProvider
	) { }

	ngOnInit () {
		this.store.dispatch(new TransactionHistoryActions.Load())
		this.store.select(TransactionHistorySelectors.getLoading)
			.subscribe(bool => this.lp.emit(bool))
		// this.store.dispatch(new AssetsActions.Load())
	}
}

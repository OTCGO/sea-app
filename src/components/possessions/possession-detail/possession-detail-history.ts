import {
	Component,
	Input,
	OnInit
} from '@angular/core'
import { Store } from '@ngrx/store'
import { RootState } from '../../../store/reducers'
import { TransactionHistoryActions } from '../../../store/actions'
import { Observable } from 'rxjs/Observable'
import { TransactionHistorySelectors } from '../../../store/selectors'
import { TransactionHistory } from '../../../shared/models'

@Component({
    selector: 'possession-detail-history',
    template: `
	    <timeline endIcon="call" [showEnd]="!!transactionHistories?.length" [style.height]="height" >
		    <h5 *ngIf="transactionHistories?.length">{{ 'POSSESSIONS.DETAILS.title' | translate }}</h5>
		    <h5 *ngIf="!transactionHistories?.length">{{ 'POSSESSIONS.DETAILS.nodata' | translate }}</h5>

		    <timeline-item *ngFor="let history of transactionHistories" ion-row>
			    <ion-col col-2>
				    <ion-icon></ion-icon>
			    </ion-col>

			    <ion-col col-4>
				    <timeline-time [time]="history.time | dateFormatPipe "></timeline-time>
			    </ion-col>

			    <ion-col col-6>
				    <div class="content">
					<span>
						{{ (translationPrefix + history.operation) | translate }}
					</span> {{ history.value }}
					    <span>
						{{ symbol }}
					</span>
				    </div>
			    </ion-col>
		    </timeline-item>
	    </timeline>
		`
})
export class PossessionDetailHistory implements OnInit {
	// @Input() isScrollUp
	// @Input() isScrollDown
	@Input() symbol
	// @Input() transactionHistories
	// @Input() scrollTop = 0
	// @Input() differentScrollTop = 0

	translationPrefix = 'POSSESSIONS.DETAILS.'
	private transactionHistories: TransactionHistory[]
	// upBoundary = window.outerHeight * 0.1
	// cardBoundary = window.outerHeight * 0.2
	// downBoundary = window.outerHeight * 0.5

	// get height () {
	// 	const { downBoundary, upBoundary, cardBoundary, isScrollUp, scrollTop, differentScrollTop } = this

	// 	const differential = scrollTop - differentScrollTop
	// 	const computedResult = isScrollUp
	// 		? Math.min(downBoundary + scrollTop * 2, upBoundary)
	// 		: Math.max(upBoundary + differential * 2, downBoundary)
	// 	if (scrollTop < cardBoundary && isScrollUp) return `${upBoundary}px`
	// 	return `${computedResult}px`
	// }

	ngOnInit () {
		this.store.dispatch(new TransactionHistoryActions.Load())

		this.store.select(TransactionHistorySelectors.getEntitiesBySelectedSymbol).subscribe((data => {
			this.transactionHistories = data
		}))


	}
	// this.store.dispatch(new TransactionHistoryActions.Load())
	ionViewWillEnter() {
		console.log('ionViewWillEnter')
		//
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad11')
	}

	constructor (
		private store: Store < RootState > ,
	) {
		// this.transactionHistories = this.store.dispatch(new TransactionHistoryActions.Load())
	}
}

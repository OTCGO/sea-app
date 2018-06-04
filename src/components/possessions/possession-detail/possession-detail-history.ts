import {
	Component,
	Input,
} from '@angular/core'


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
export class PossessionDetailHistory {
	// @Input() isScrollUp
	// @Input() isScrollDown
	@Input() symbol
	@Input() transactionHistories
	// @Input() scrollTop = 0
	// @Input() differentScrollTop = 0

	translationPrefix = 'POSSESSIONS.DETAILS.'
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
}

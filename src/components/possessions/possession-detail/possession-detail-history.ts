import {
	Component,
	Input,
} from '@angular/core'
import { IBalance } from '../../../shared/models'

@Component({
    selector: 'possession-detail-history',
    template: `
	    <timeline endIcon="call" [showEnd]="!!transactionHistories?.length" [ngClass]="{
				'is-scroll-up': isScrollUp,
				'is-scroll-down': isScrollDown
			}">
		    <h5 *ngIf="transactionHistories?.length">{{ 'POSSESSIONS.DETAILS.title' | translate }}</h5>
		    <h5 *ngIf="!transactionHistories?.length">{{ 'POSSESSIONS.DETAILS.nodata' | translate }}</h5>

		    <timeline-item *ngFor="let history of transactionHistories" ion-row>
			    <ion-col col-2>
				    <ion-icon></ion-icon>
			    </ion-col>

			    <ion-col col-4>
				    <timeline-time [time]="history.time"></timeline-time>
			    </ion-col>

			    <ion-col col-6>
				    <div class="content">
					<span>
						{{ (translationPrefix + history.operation) | translate }}
					</span> {{ history.value }}
					    <span>
						{{ balance.symbol }}
					</span>
				    </div>
			    </ion-col>
		    </timeline-item>
	    </timeline>
		`
})
export class PossessionDetailHistory {
	@Input() isScrollUp
	@Input() isScrollDown
	@Input() balance: IBalance
	@Input() transactionHistories

	translationPrefix = 'POSSESSIONS.DETAILS.'
}

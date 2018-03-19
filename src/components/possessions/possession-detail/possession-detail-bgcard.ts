import {
	Component,
	Input,
} from '@angular/core'

import { IBalance } from '../../../shared/models'

@Component({
	selector: 'possession-detail-bgcard',
	template: `
	  <ion-card class="possession-data-card" [ngClass]="{
	    'is-scroll-up': isScrollUp,
      'is-scroll-down': isScrollDown
	  }">
		  <div class="possession-data-amount">{{ balance.amount.toString() }}</div>
		  <div class="possession-data-approximation">≈ ￥ {{ balance.amount.times(price) }}</div>
		  <button color="light" ion-button round class="otcgo-button" (click)="showSendModal()" [disabled]="balance.amount.lte(0)">
			  {{ 'POSSESSIONS.DETAILS.transfer' | translate }}
		  </button>
	  </ion-card>
	`
})
export class PossessionDetailBgcard {
	@Input() isScrollUp: boolean
	@Input() isScrollDown: boolean
	@Input() balance: IBalance
	@Input() price: number
}

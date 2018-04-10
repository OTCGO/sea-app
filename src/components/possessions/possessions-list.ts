import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IBalance } from '../../shared/models'

@Component({
	selector: 'possessions-list',
	template: `
	  <ion-grid class="possessions__base-accumulator">
		  <ion-row class="card-base">
			  <ion-col col-9>
				  <ion-card class="possessions__total-balances">
					  <ion-row>{{ 'POSSESSIONS.totalBalances' | translate }} {{ baseCurrency.toUpperCase() }}</ion-row>
					  <ion-row class="possessions__volume">{{ amount | number:'1.1-4' }}</ion-row>
				  </ion-card>
			  </ion-col>
			  <ion-col col-3 class="possessions__hide-zero" align-self-end>
				  <ion-card (click)="displayZeroClick.emit(!displayZero)">
					  <img *ngIf="displayZero" src="assets/imgs/icon-possessions_hide-zero.svg" alt="">
						<img *ngIf="!displayZero" src="assets/imgs/icon-possessions_hide-zero-on.svg" alt="">
						<h5>{{ 'POSSESSIONS.displayZero' | translate }}</h5>
				  </ion-card>
			  </ion-col>
		  </ion-row>
	  </ion-grid>
	  
	  <ion-card class="card-list"
	            *ngFor="let balance of balances">

		  <ion-item (click)="select.emit(balance.symbol)">
			  <div class="possessions__icon"
			       item-start>
				  <img src="{{ 'assets/icon/' + balance?.symbol +'.png' }}"
				       onerror="this.src='assets/icon/申一币.png'" />
			  </div>

			  <p class="possessions__symbol">{{ balance?.symbol }}</p>

			  <ion-note item-end>
				  {{ balance?.amount | number:'1.1-2' }}
			  </ion-note>
		  </ion-item>

	  </ion-card>
	`
})
export class PossessionsListComponent {
	@Input() balances: Array<IBalance>
	@Input() displayZero: boolean
	@Input() amount = 0.00
	@Input() baseCurrency: string = 'cny'
	@Output() select = new EventEmitter()
	@Output() displayZeroClick = new EventEmitter()
}

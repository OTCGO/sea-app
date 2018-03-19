import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IBalance } from '../../shared/models'

@Component({
	selector: 'possessions-list',
	template: `
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
				  {{ balance?.amount }}
			  </ion-note>
		  </ion-item>

	  </ion-card>
	`
})
export class PossessionsListComponent {
	@Input() balances: Array<IBalance>
	@Output() select = new EventEmitter()
}

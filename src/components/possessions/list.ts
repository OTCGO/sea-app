import { Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { select, Store } from '@ngrx/store'
import * as fromBalances from '../../reducers/balances.reducer'

@Component({
	selector: 'possessions-list',
	template: `
	  <ion-card class="card-list" *ngFor="let balance of balances$ | async">
			  
		  <ion-item [navPush]="possessionDetailPage" [navParams]="balance">
			  <div class="possessions__icon" item-start>
				  <img src="{{ 'assets/icon/'+balance?.symbol+'.png' }}" onerror="this.src='assets/icon/申一币.png'" />
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
	balances$: Observable<Array<any>>

	constructor (private store: Store<fromBalances.BalancesState>) { }

	ngOnInit () {
		this.balances$ = this.store.pipe(
			select(fromBalances.selectEntities)
		)
	}

}

import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Loading } from 'ionic-angular'
import { map } from 'rxjs/operator/map'
import { _do } from 'rxjs/operator/do'
import { BalancesActions, AccountsActions, AccountActions, MarketsActions, PricesActions, SettingsActions } from '../actions'



@Injectable()
export class LoadingEffect {
	loading: Loading

	@Effect({ dispatch: false })
	Loading$ =
		this.actions$.pipe(
			ofType(
				BalancesActions.BalancesActionTypes.LOAD,
				AccountActions.AccountActionTypes.LOAD,
				AccountsActions.AccountsActionTypes.LOAD,
				MarketsActions.MarketsActionTypes.LOAD,
				PricesActions.PricesActionTypes.LOAD,
				SettingsActions.SettingsActionTypes.LOAD
			),
		)

	constructor (private actions$: Actions, private loadingCtrl) {}
}
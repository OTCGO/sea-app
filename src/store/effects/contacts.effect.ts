import { Injectable } from '@angular/core'
import {
	Actions,
	Effect,
	ofType
} from '@ngrx/effects'
import {
	Store
} from '@ngrx/store'
import { empty } from 'rxjs/observable/empty'
import { of } from 'rxjs/observable/of'
import {
	catchError,
	map,
	withLatestFrom
} from 'rxjs/operators'

import { RootState } from '../reducers'
import {
	ContactsActionTypes,
	Load,
	LoadFail,
	LoadSuccess
} from '../actions/contacts.action'
import { getAll } from '../selectors/contacts.selector'
import * as WalletActions from '../actions/wallet.action'


@Injectable()
export class ContactsEffects {
	@Effect() load$ = this.actions$.pipe(
		ofType<Load>(ContactsActionTypes.LOAD),
		map(action => new LoadSuccess(action.payload)),
		catchError(error => of(new LoadFail(error)))
	)

	@Effect() update$ = this.actions$.pipe(
		ofType<Load>(ContactsActionTypes.UPDATE),
		withLatestFrom(this.store.select(getAll), (_, contacts) => contacts),
		map(contacts => {
			const value = { contacts }
			const payload = { key: 'extra', value }
			return new WalletActions.Update(payload)
		}),
		catchError(error => of(new LoadFail(error)))
	)

	constructor (private actions$: Actions, private store: Store<RootState>) {}
}

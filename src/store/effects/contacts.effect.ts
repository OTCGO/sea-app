import { Injectable } from '@angular/core'
import {
	Actions,
	Effect,
	ofType
} from '@ngrx/effects'
import { of } from 'rxjs/observable/of'
import {
	catchError,
	map
} from 'rxjs/operators'
import {
	ContactsActionTypes,
	Load,
	LoadFail,
	LoadSuccess
} from '../actions/contacts.action'
import {

} from '../actions/wallet.action'


@Injectable()
export class ContactsEffects {
	@Effect() load$ = this.actions$.pipe(
		ofType<Load>(ContactsActionTypes.LOAD),
		map(action => new LoadSuccess(action.payload)),
		catchError(error => of(new LoadFail(error)))
	)

	@Effect() update$ = this.actions$.pipe(
		ofType<Load>(ContactsActionTypes.UPDATE),
		map(action => new LoadSuccess(action.payload)),
		catchError(error => of(new LoadFail(error)))
	)

	constructor (private actions$: Actions) {}
}

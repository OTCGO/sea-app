import { Injectable } from '@angular/core'
import {
	Actions,
	Effect
} from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { of } from 'rxjs/observable/of'
import {
	ClaimsActionTypes,
	LoadONG,
	DoClaim,
	Load,
	LoadFail,
	LoadSuccess
} from '../actions/claims.action'
import { ApiProvider, API_CONSTANTS } from '../../providers'
import { Account } from '../../shared/typings'
import {
	catchError,
	concatMap,
	map,
	withLatestFrom,
	pluck
} from 'rxjs/operators'
import { RootState } from '../reducers'
import { getAccount } from '../selectors/wallet.selector'


@Injectable()
export class ClaimsEffects {
	@Effect()
	Load$ =
		this.actions$
				.ofType<Load>(ClaimsActionTypes.LOAD)
				.pipe(
					withLatestFrom(this.store$.select(getAccount), (_, account: Account) => account.address),
					concatMap(
						address =>
							this.api.get(`${API_CONSTANTS.GAS}/${address}`)
								.pipe(
									map(res => new LoadSuccess(res)),
									catchError(error => of(new LoadFail(error)))
								)
					)
				)

	@Effect()
	LoadONG$ =
		this.actions$
				.ofType<Load>(ClaimsActionTypes.LOAD_ONG)
				.pipe(
					withLatestFrom(this.store$.select(getAccount), (_, account: Account) => account.address),
					concatMap(
						address =>
							this.api.get(`${API_CONSTANTS.GAS}/ont/${address}`)
								.pipe(
									map(res => new LoadSuccess(res)),
									catchError(error => of(new LoadFail(error)))
								)
					)
				)


	@Effect()
	DoClaims$ =
		this.actions$
				.ofType<DoClaim>(ClaimsActionTypes.DO_CLAIM)
				.pipe(
					pluck('payload'),
					withLatestFrom(this.store$.select(getAccount), (passphrase, account) => ({ passphrase, account })),
					concatMap(
						({ passphrase, account }) => {
							return this.api.get('')
						}
					)
				)

	constructor (private actions$: Actions, private store$: Store<RootState>, private api: ApiProvider) {}
}

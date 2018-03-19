import { Injectable } from '@angular/core'
import { Action, Store } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { BigNumber } from 'bignumber.js'
import { Observable } from 'rxjs/Observable'
import { empty } from 'rxjs/observable/empty'
import { of } from 'rxjs/observable/of'
import {
	map,
	switchMap,
	catchError,
	skip,
	takeUntil,
	publishLast,
	refCount, withLatestFrom
} from 'rxjs/operators'
import { RootState } from '../../store/reducers'

import { BalancesActionTypes, Load, LoadFail, LoadSuccess } from '../actions/balances.action'
import { ASSET_ENUM } from '../../shared/constants'
import { ApiProvider, API_CONSTANTS } from '../../providers/api'

@Injectable()
export class BalancesEffects {
	@Effect()
	Load$: Observable<Action> =
		this.actions$.pipe(
			ofType<Load>(BalancesActionTypes.LOAD),
			withLatestFrom(this.store$, (_, state: RootState) => {
				const account = state.wallet.entity.accounts.find(account => account.isDefault)
				return account.address
			}),
			switchMap(query => {
				if (query === '') {
					return empty()
				}

				const nextGet$ = this.actions$.pipe(
					ofType(BalancesActionTypes.LOAD),
					skip(1)
				)

				return this.apiProvider
									 .get(`${API_CONSTANTS.BALANCES}/${query}`)
									 .pipe(
										 takeUntil(nextGet$),
										 publishLast(),
										 refCount(),
										 catchError(error => of(new LoadFail(error))),
										 map(
											 (res: any) => res.error
												 ? new LoadFail(res.error)
												 : new LoadSuccess(mappingBalances(res))
										 ),
										 catchError(error => of(new LoadFail(error)))
									 )
			})
		)

	constructor (
		private actions$: Actions,
		private apiProvider: ApiProvider,
		private store$: Store<RootState>
	) {}
}


const mappingBalances = ({ balances }) =>
	balances
		? Object.keys(balances)
						.map(key => (
							{
								hash: key,
								symbol: ASSET_ENUM[key] || '暂无',
								amount: new BigNumber(balances[key])
							})
						)
		: []

import { Injectable } from '@angular/core'
import { Action, Store } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { BigNumber } from 'bignumber.js'
import { Observable } from 'rxjs/Observable'
import { empty } from 'rxjs/observable/empty'
import { forkJoin } from 'rxjs/observable/forkJoin'
import { from } from 'rxjs/observable/from'
import { of } from 'rxjs/observable/of'
import {
	map,
	switchMap,
	catchError,
	skip,
	takeUntil,
	publishLast,
	refCount,
	withLatestFrom,
	merge
} from 'rxjs/operators'
import {
	getEveryAccountAddress
} from '../../shared/utils'
import { RootState } from '../../store/reducers'

import { BalancesActionTypes, Load, LoadFail, LoadSuccess } from '../actions/balances.action'
import { ASSET_ENUM } from '../../shared/constants'
import { ApiProvider, API_CONSTANTS } from '../../providers/api'

import 'rxjs/add/operator/concatMap'


@Injectable()
export class BalancesEffects {
	@Effect()
	Load$: Observable<Action> =
		this.actions$.pipe(
			ofType<Load>(BalancesActionTypes.LOAD),
			withLatestFrom(
				this.store$,
				(_, state: RootState) => getEveryAccountAddress(state.wallet.entity)
			),
			switchMap(addresses => {
				const nextGet$ = this.actions$.pipe(
					ofType(BalancesActionTypes.LOAD),
					skip(1)
				)

				return forkJoin(addresses.map(this.getBalance.bind(this))).pipe(
					takeUntil(nextGet$),
					map(balances => new LoadSuccess(balances.reduce(balancesReducer, {}))),
					catchError(error => of(new LoadFail(error)))
				)
			})
		)

	getBalance (addr) {
		return this.apiProvider
							 .get(`${API_CONSTANTS.BALANCES}/${addr}`)
							 .pipe(
								 publishLast(),
								 refCount(),
								 catchError(error => of(new LoadFail(error)))
							 )
	}

	constructor (
		private actions$: Actions,
		private apiProvider: ApiProvider,
		private store$: Store<RootState>
	) {}
}

const balancesReducer = (acc, { _id: address, balances }) => ({...acc, [address]: mappingBalances(balances)})

const mappingBalances = (balances) =>
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

import { Injectable } from '@angular/core'
import { Action, Store } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import {
	flatten,
	values,
	prop,
	propOr,
	either
} from 'ramda'
import { Observable } from 'rxjs/Observable'
import { forkJoin } from 'rxjs/observable/forkJoin'
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
	mergeMap,
	merge
} from 'rxjs/operators'
import {
	getEveryAccountAddress
} from '../../shared/utils'
import { RootState } from '../../store/reducers'
import { interval } from 'rxjs/observable/interval'

import { BalancesActionTypes, Load, LoadFail, LoadSuccess } from '../actions/balances.action'
import { ApiProvider, API_CONSTANTS } from '../../providers/api'

import 'rxjs/add/operator/concatMap'

// import { balanceSort } from '../../shared/utils'


@Injectable()
export class BalancesEffects {
	@Effect()
	Load$: Observable<Action> =
		this.actions$.pipe(
			ofType<Load>(BalancesActionTypes.LOAD),

			// merge(interval(10000)),
			withLatestFrom(
				this.store$,
				(_, state: RootState) => getEveryAccountAddress(state.wallet.entity)
			),

			switchMap(addresses => {
				const nextGet$ = this.actions$.pipe(
					ofType(BalancesActionTypes.LOAD),
					skip(1)
				)
				return this.apiProvider
									 .get(`${API_CONSTANTS.ASSET}`)
									 .pipe(
										 mergeMap((asset: { NEP5, Global, ONTOLOGY }) =>
											 forkJoin(addresses.map(this.getBalance.bind(this))).pipe(

												 takeUntil(nextGet$),

												 map(balances => new LoadSuccess(balances.reduce(balancesReducer(flatten(values(asset))), {}))),
												 catchError(error => of(new LoadFail(error)))
											 ),
										 ),
										 catchError(error => of(new LoadFail(error)))
									 )
			})
		)

	getBalance (addr) {
		return this.apiProvider
							 .get(`${API_CONSTANTS.BALANCES}/neo/${addr}`)
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

function balancesReducer (asset) {
	return (acc, { _id: address, balances }) => {
		// console.log('balancesReducer', balanceSort(mappingBalances(balances, asset)))
		 // return ({...acc, [address]: balanceSort(mappingBalances(balances, asset))})
		 console.log('balancesReducer', mappingBalances(balances, asset))
		 return ({...acc, [address]: mappingBalances(balances, asset)})
	}
}

function mappingBalances (balances, asset) {
	return balances
		? Object.keys(balances)
						.map(hash => {
							const coin = asset.find(c => c.id === hash)
							const name = either(prop('symbol'), propOr('-', 'name'))(coin)
							// console.log('mappingBalances', name)
							const sym = Array.isArray(name) ? name[0].name : name
							const type = coin.type
							const symbol = sym === '小蚁股' ? 'NEO'
								: sym === '小蚁币' ? 'GAS'
									: sym
							return {
								hash,
								symbol,
								type:type,
								// amount: Number(balances[hash])
								amount: balances[hash]
							}
						})
		: []
}

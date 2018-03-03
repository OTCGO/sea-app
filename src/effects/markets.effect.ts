import { Injectable } from '@angular/core'
import { PriceProvider } from '../providers'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { of } from 'rxjs/observable/of'
import { fromPromise } from 'rxjs/observable/fromPromise'

import {
	map,
	skip,
	takeUntil,
	switchMap,
	catchError,
	debounceTime,
} from 'rxjs/operators'

import { Load, LoadFail, LoadSuccess, MarketsActionTypes } from '../actions/markets.action'

import * as Neon from '../libs/neon'
import { Observable } from 'rxjs/Observable'
import { Action } from '@ngrx/store'


@Injectable()
export class MarketsEffects {
	@Effect()
	load$: Observable<Action> =
		this.actions$.pipe(
			ofType<Load>(MarketsActionTypes.LOAD),
			debounceTime(300),
			switchMap(_ => {
				const nextLoad$ = this.actions$.pipe(
					ofType<Load>(MarketsActionTypes.LOAD),
					skip(1)
				)

				return fromPromise(
					Neon.api.cmc.getMarkets(PriceProvider.NEO_CHAIN_COINS,  'cny')
				).pipe(
					takeUntil(nextLoad$),
					map(markets => new LoadSuccess(markets)),
					catchError(error => of(new LoadFail(error)))
				)
			})
		)

	constructor (private actions$: Actions) {}
}

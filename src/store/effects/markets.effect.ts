import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import {
	Action,
	Store
} from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { from } from 'rxjs/observable/from'
import { of } from 'rxjs/observable/of'
import { fromPromise } from 'rxjs/observable/fromPromise'
import {
	skip,
	mergeMap,
	takeUntil,
	switchMap,
	catchError,
	publishLast,
	refCount,
	timeout,
	withLatestFrom
} from 'rxjs/operators'
import { RootState } from '../reducers'
import { PriceProvider } from '../../providers'
import { Load, LoadFail, LoadSuccess, MarketsActionTypes } from '../actions/markets.action'
import { Load as LoadPricesSuccess } from '../actions/prices.action'
import { api } from '../../libs/neon'
import { getCurrency } from '../selectors/settings.selector'

@Injectable()
export class MarketsEffects {
	@Effect()
	load$: Observable<Action> =
		this.actions$.pipe(
			ofType<Load>(MarketsActionTypes.LOAD),
			withLatestFrom(this.store$.select(getCurrency), (_, currency) => currency),
			switchMap(currency => {
				const nextLoad$ = this.actions$.pipe(
					ofType<Load>(MarketsActionTypes.LOAD),
					skip(1)
				)

				return loadMarkets(nextLoad$, currency)
			})
		)

	constructor (private actions$: Actions, private store$: Store<RootState>) {}
}

function loadMarkets (nextLoad$, baseCurrency = 'cny') {
	return fromPromise(api.cmc.getMarkets(PriceProvider.NEO_CHAIN_COINS,  baseCurrency))
	.pipe(
		catchError(error => of(new LoadFail(error))),
		timeout(12368),
		catchError(error => of(new LoadFail(error))),
		takeUntil(nextLoad$),
		publishLast(),
		refCount(),
		mergeMap(
			markets =>
				markets
					? from([new LoadPricesSuccess(mappingPrices(markets)), new LoadSuccess(markets)])
					: of(new LoadFail('Get markets error'))
		),
		catchError(error => of(new LoadFail(error)))
	)
}

function mappingPrices (markets) {
	return markets.map(ticker => ({ [ticker.symbol]: ticker.currentPrice }))
								.reduce((acc, cur) => ({...acc, ...cur}), {})
}

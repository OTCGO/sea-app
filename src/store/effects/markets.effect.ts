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
	withLatestFrom,
	map
} from 'rxjs/operators'
import { RootState } from '../reducers'
import { ApiProvider, PriceProvider } from '../../providers'
import {
	Load,
	LoadDetail,
	LoadDetailSuccess,
	LoadFail,
	LoadSuccess,
	MarketsActionTypes
} from '../actions/markets.action'
import { Load as LoadPricesSuccess } from '../actions/prices.action'
import { api } from '../../libs/neon'
import { SettingsSelectors, MarketsSelectors } from '../selectors'


@Injectable()
export class MarketsEffects {
	@Effect()
	load$: Observable<Action> =
		this.actions$.pipe(
			ofType<Load>(MarketsActionTypes.LOAD),
			withLatestFrom(this.store$.select(SettingsSelectors.getCurrency), (_, currency) => currency),
			switchMap(currency => {
				const nextLoad$ = this.actions$.pipe(
					ofType<Load>(MarketsActionTypes.LOAD),
					skip(1)
				)

				return loadMarkets(nextLoad$, currency)
			})
		)

	@Effect()
	LoadDetail$: Observable<Action> =
		this.actions$.pipe(
			ofType<LoadDetail>(MarketsActionTypes.LOAD_DETAIL),
			map(action => action.payload),
			withLatestFrom(
				this.store$.select(SettingsSelectors.getCurrency),
				this.store$.select(MarketsSelectors.getSelectedSymbol),
				(duration, currency, symbol) => ({ duration, currency, symbol })
			),
			switchMap(({ duration, currency, symbol }) => {
				const nextLoadDetail$ = this.actions$.pipe(
					ofType<Load>(MarketsActionTypes.LOAD),
					skip(1)
				)

				const params = {
					fsym: symbol.toUpperCase(),
					tsym: currency.toUpperCase()
				}

				switch (duration) {
					case 'hour':
						return this.fetchDetails(nextLoadDetail$, 'histominute', { ...params, limit: 60 })
					case 'day':
						return this.fetchDetails(nextLoadDetail$, 'histohour', { ...params, limit: 24 })
					case 'week':
						return this.fetchDetails(nextLoadDetail$, 'histohour', { ...params, limit: 168 })
					case 'month':
						return this.fetchDetails(nextLoadDetail$, 'histoday', { ...params, limit: 30 })
					default: return this.fetchDetails(nextLoadDetail$, 'histominute', { ...params, limit: 60 })
				}
			})
		)

	constructor (private actions$: Actions, private store$: Store<RootState>, private apiProvider: ApiProvider) {}

	fetchDetails (next, call, params) {
		return this.apiProvider.request('GET', `https://min-api.cryptocompare.com/data/${call}`, { params })
			.pipe(
				takeUntil(next),
				publishLast(),
				refCount(),
				map(
					r =>
						r
							? new LoadDetailSuccess(r.Data)
							: new LoadFail('Get markets details error, Response didn\'t exits')
				),
				catchError(error => of(new LoadFail(error)))
			)
	}
}

function loadMarkets (nextLoad$, baseCurrency = 'cny') {
	return fromPromise(api.cmc.getMarkets(PriceProvider.NEO_CHAIN_COINS, baseCurrency))
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

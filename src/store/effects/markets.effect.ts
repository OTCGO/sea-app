import { Injectable } from '@angular/core'
import { NativeStorage } from '@ionic-native/native-storage'
import { Database } from '@ngrx/db'
import { Actions, Effect, ofType } from '@ngrx/effects'
import {
	Action,
	Store
} from '@ngrx/store'
import { Platform } from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { combineLatest } from 'rxjs/observable/combineLatest'
import { defer } from 'rxjs/observable/defer'
import { from } from 'rxjs/observable/from'
import { of } from 'rxjs/observable/of'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { empty } from 'rxjs/Observable/empty'
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
	map,
	toArray,
	tap
} from 'rxjs/operators'
import { RootState } from '../reducers'
import { ApiProvider, PriceProvider } from '../../providers'
import {
	Load,
	LoadDetail,
	LoadDetailSuccess,
	LoadFail,
	LoadSuccess,
	MarketsActionTypes,
	UpdateMarketsLoadTime
} from '../actions/markets.action'
import { Load as LoadPricesSuccess } from '../actions/prices.action'
import { api } from '../../libs/neon'
import { SettingsSelectors, MarketsSelectors } from '../selectors'
import { FIVE_MINUTES_MS } from '../../shared/constants'
import { fromPairs, toPairs, values, compose, map as rMap, zipObj } from 'ramda'


const enti2aob = compose(rMap(zipObj(['symbol', 'price'])), toPairs)
const aob2enti = compose(fromPairs, rMap(values))

@Injectable()
export class MarketsEffects {
	@Effect({ dispatch: false })
	openDB$: Observable<any> = defer(() => this.db.open('sea_app'))

	@Effect()
	load$: Observable<Action> =
		this.actions$.pipe(
			ofType<Load>(MarketsActionTypes.LOAD),
			withLatestFrom(
				this.store$.select(SettingsSelectors.getCurrency),
        this.store$.select(SettingsSelectors.getPreCurrency),
        this.store$.select(MarketsSelectors.getPreMarketsLoadTime),
				(_, currency, preCurrency, preTime) => ({ currency, preCurrency, preTime })),
			switchMap(({ currency, preCurrency, preTime }) => {
			  const isPreLoadTimeLessThanFiveMinutes = preTime + FIVE_MINUTES_MS > Date.now()
        if (isPreLoadTimeLessThanFiveMinutes && preCurrency === currency) return this.loadFromDatabase()

				const nextLoad$ = this.actions$.pipe(
					ofType<Load>(MarketsActionTypes.LOAD),
					skip(1)
				)

				return loadMarkets.bind(this)(nextLoad$, currency)
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

				const params = { fsym: symbol.toUpperCase(), tsym: currency.toUpperCase() }

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

	constructor (
		private actions$: Actions,
		private store$: Store<RootState>,
		private apiProvider: ApiProvider,
		private nativeStorage: NativeStorage,
		private db: Database,
		private platform: Platform
	) {}

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

	loadFromDatabase () {
		if (this.platform.is('mobileweb')) {
			return combineLatest(
				this.db.query('markets').pipe(toArray()),
				this.db.query('prices').pipe(toArray()),
			).pipe(
				mergeMap(([markets, prices]) => {
          const enti = aob2enti(prices)
					console.log('markets', markets)
					console.log('reversed prices', enti)
					return [new LoadSuccess(markets), new LoadPricesSuccess(enti)]
				}),
				catchError(e => {
					console.log('error from loadFromDatabase', e)
					return of(new LoadFail(e))
				})
			)
		}

		return combineLatest(
			this.nativeStorage.getItem('prices'),
			this.nativeStorage.getItem('markets')
		).pipe(
			mergeMap(([markets, prices]) => [new LoadSuccess(markets), new LoadPricesSuccess(prices)]),
			catchError(e => {
				console.log('error from loadFromDatabase', e)
				return of(new LoadFail(e))
			})
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
				markets => {
					if (markets) {
						const mappedPrices = mappingPrices(markets)
						if (this.platform.is('mobileweb') || this.platform.is('core')) {
							const arrayOfPrices = enti2aob(mappedPrices)
							this.db.insert('markets', markets)
                .subscribe(
                  m => console.log('Insert markets successful', m),
                  e => console.log('Insert markets fail', e),
                  c => console.log('Insert markets complete', c)
                )
							this.db.insert('prices', arrayOfPrices)
                .subscribe(
                  m => console.log('Insert prices successful', m),
                  e => console.log('Insert prices fail', e),
                  c => console.log('Insert prices complete', c)
                )
							console.log('Fallback using DB')
							console.log('Insert markets', markets)
							console.log('Insert prices', arrayOfPrices)
						} else {
							try {
								this.nativeStorage.setItem('prices', mappedPrices)
								this.nativeStorage.setItem('markets', markets)
							} catch (e) {
								console.log('Error on load markets effect nativeStorage execution', e)
							}
						}
						return from([
							new LoadSuccess(markets),
							new LoadPricesSuccess(mappedPrices),
							new UpdateMarketsLoadTime()
						])
					}
					return of(new LoadFail('Get markets error'))
				}
			),
			catchError(error => of(new LoadFail(error)))
		)
}

function mappingPrices (markets) {
	return markets.map(ticker => ({ [ticker.symbol]: ticker.currentPrice }))
								.reduce((acc, cur) => ({...acc, ...cur}), {})
}

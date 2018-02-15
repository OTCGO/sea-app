import { Optional, Inject, Injectable, InjectionToken } from '@angular/core'
import { Action } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { ApiProvider } from '../providers/api/api.provider'

import { Observable } from 'rxjs/Observable'
import { Scheduler } from 'rxjs/Scheduler'
import { async } from 'rxjs/scheduler/async'
import { empty } from 'rxjs/observable/empty'
import { of } from 'rxjs/observable/of'
import {
	debounceTime,
	map,
	switchMap,
	catchError, skip, takeUntil
} from 'rxjs/operators'

import { GET_BALANCES_TYPES, Get, GetError, GetSuccess } from '../actions/balances.action'

const SEARCH_DEBOUNCE = new InjectionToken<number>('GetBalances Debounce')
const SEARCH_SCHEDULER = new InjectionToken<Scheduler>('Search Scheduler')

interface IRes {
	balances: {}
	utxo
	error?: string
}

@Injectable()
export class BalancesEffects {
	@Effect()
	GET$: Observable<Action> =
		this.actions$.pipe(
			ofType<Get>(GET_BALANCES_TYPES.GET),
			debounceTime(this.debounce || 300, this.scheduler || async),
			map(action => action.payload),
			switchMap(query => {
				if (query === '')
					return empty()

				const nextGet$ = this.actions$.pipe(
					ofType(GET_BALANCES_TYPES.GET),
					skip(1)
				)

				return this.apiProvider
				           .get('address/' + query)
				           .pipe(
					           takeUntil(nextGet$),
					           map(
						           (res: any) => res.error
							           ? Observable.throw(res.error)
							           : new GetSuccess(res)
					           ),
					           catchError(error => of(new GetError(error)))
				           )
			})
		)

	constructor (
		private actions$: Actions,
		@Optional() @Inject(SEARCH_DEBOUNCE)
		private debounce: number,
		@Optional() @Inject(SEARCH_SCHEDULER)
		private scheduler: Scheduler,
		private apiProvider: ApiProvider
	) {}
}
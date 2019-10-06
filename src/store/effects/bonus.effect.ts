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

import { BonusActionTypes, Load, LoadFail, LoadSuccess } from '../actions/bonus.action'
import { ApiProvider, API_CONSTANTS } from '../../providers/api'

import 'rxjs/add/operator/concatMap'

// import { balanceSort } from '../../shared/utils'
import { apiVersion } from '../../constants'


@Injectable()
export class BonusEffects {
	@Effect()
	Load$: Observable<Action> =
		this.actions$.pipe(
			ofType<Load>(BonusActionTypes.LOAD),

			// merge(interval(10000)),
			withLatestFrom(
				this.store$,
				(_, state: RootState) => getEveryAccountAddress(state.wallet.entity)
			),

			mergeMap((addresss) => this.apiProvider.getV2(`node/history/bonus/${addresss}`)
				.pipe(
					// map(reulte => {
					//     console.log('NodeEffects', reulte)
					//     if (reulte.code === '200') {
					//         return new LoadSuccess(reulte.data)
					//     };
					//     return of(new LoadFail(reulte.message))
					// }),
					map(reulte => (new LoadSuccess(reulte.data))),
					catchError(error => of(new LoadFail(error)))
				))
		)




	constructor(
		private actions$: Actions,
		private apiProvider: ApiProvider,
		private store$: Store<RootState>
	) { }
}



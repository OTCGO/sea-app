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
    merge,
    concat
} from 'rxjs/operators'

import { interval } from 'rxjs/observable/interval'

import { VersionActionTypes, Load, LoadFail, LoadSuccess } from '../actions/version.action'
import { ApiProvider, API_CONSTANTS } from '../../providers/api'

import 'rxjs/add/operator/concatMap'

import { Version } from '../../shared/models'

@Injectable()
export class VersionEffects {
    private isDisplay = false
    @Effect()
    Load$: Observable<Action> =
        this.actions$.pipe(
            ofType<Load>(VersionActionTypes.LOAD),
            map((action: Load) => action.payload),
            switchMap((v: Version) => {
                // const nextGet$ = this.actions$.pipe(
				// 	ofType(VersionActionTypes.LOAD),
				// 	skip(1)
				// )
                return this.apiProvider
                    .get(`version/${v.platform}`)
                    .pipe(
                        // takeUntil(nextGet$),
                        map(res => {
                            console.log('isDisplay', this.isDisplay)
                            console.log('res', res)
                            // this.isDisplay = true
                            if (!this.isDisplay) {
                                this.isDisplay = true
                                res.version.isDisplay = false
                                return new LoadSuccess(res.version)
                            }

                            res.version.isDisplay = true
                            return new LoadSuccess(res.version)

                        }),
                        catchError(error => of(new LoadFail(error)))
                    )
            })
        )



    constructor(
        private actions$: Actions,
        private apiProvider: ApiProvider,
        // private store$: Store<RootState>
    ) { }
}


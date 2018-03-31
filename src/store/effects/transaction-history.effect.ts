import { Injectable } from '@angular/core'
import { Action, Store } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
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

import * as moment from 'moment'
import { getSelectedBalance } from '../selectors/balances.selector'
import { getAccount } from '../selectors/wallet.selector'
import { RootState } from '../../store/reducers'
import { ApiProvider, API_CONSTANTS } from '../../providers/api'
import {
	TransactionHistoryActionTypes,
	Load,
	LoadFail,
	LoadSuccess
} from '../actions/transaction-history.action'


@Injectable()
export class TransactionHistoryEffects {
	@Effect()
	Load$: Observable<Action> =
		this.actions$.pipe(
			ofType<Load>(TransactionHistoryActionTypes.LOAD),
			withLatestFrom(
				this.store$.select(getAccount),
				this.store$.select(getSelectedBalance),
				(_, account, selectedBalance) => ({
					address: account && account.address,
					balance: selectedBalance
				})
			),
			switchMap(({ balance, address }) => {
				if (balance.hash === '' || balance.symbol === '' || address === '') {
					return empty()
				}

				const nextLoad$ = this.actions$.pipe(
					ofType(TransactionHistoryActionTypes.LOAD),
					skip(1)
				)

				return this.apiProvider
									 .get(`${API_CONSTANTS.HISTORY}/${address}`)
									 .pipe(
										 takeUntil(nextLoad$),
										 publishLast(),
										 refCount(),
										 catchError(error => of(new LoadFail(error))),
										 map(
											 (res: any) => res.error
												 ? new LoadFail(res.error)
												 : new LoadSuccess(mappingTransactions(balance.hash, res)
												 )
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

const mappingTransactions = (hash, { result }) =>
	result && parseTx(
	result.filter(item => item.asset === '0x' + hash)
	)

const parseTx = data => data.map(history => {
	const [subtitle, title] =
		moment(data['time']).add(8, 'h')
												.format('GGGG/MM/DD HH:mm:ss')
												.toString()
												.split(' ')
	return {
		...history,
		time: { subtitle, title }
	}
})

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
	refCount,
	withLatestFrom,
	concatMap,
	mergeMap
} from 'rxjs/operators'
import {
	Global,
	NEP5
} from '../../shared/models/asset.model'
import {
	flatten,
	values,
} from 'ramda'
import { getAccount } from '../selectors/wallet.selector'
import { getSelectedBalance } from '../selectors/balances.selector'
import { getSelectedTxid } from '../selectors/transaction-history.selector'
import { RootState } from '../../store/reducers'
import { ApiProvider, API_CONSTANTS } from '../../providers/api'
import { TransactionHistory } from '../../shared/models'
import {
	TransactionHistoryActionTypes,
	Load,
	LoadFail,
	LoadSuccess,
	LoadDetail,
	LoadDetailSuccess,
	LoadDetailFail
} from '../actions/transaction-history.action'

// TODO
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
					asset: selectedBalance && selectedBalance.hash
				})
			),
			switchMap(({ address, asset }) => {
				if (address === '') return empty()

				const nextLoad$ = this.actions$.pipe(
					ofType(TransactionHistoryActionTypes.LOAD),
					skip(1)
				)

				const params = { asset }

				return this.apiProvider
									 .get(`${API_CONSTANTS.HISTORY}/${address}`, { params })
									 .pipe(
										 takeUntil(nextLoad$),
										 publishLast(),
										 refCount(),
										 catchError(error => of(new LoadFail(error))),
										 mergeMap(
											 ({ result, error }: any) => error
												 ? of(new LoadFail(error))
												 : this.apiProvider
															 .get(`${API_CONSTANTS.ASSET}`)
															 .pipe(
																 map((asset: { NEP5, Global }) =>
																	 new LoadSuccess(mapTransactionHistory(result, flatten(values(asset)))))
															 )
										 ),
										 catchError(error => of(new LoadFail(error)))
									 )
			})
		)

	@Effect()
	LoadDetail$ =
		this.actions$.pipe(
			ofType<LoadDetail>(TransactionHistoryActionTypes.LOAD_DETAIL),
			withLatestFrom(this.store$.select(getSelectedTxid), (_, txid) => txid),
			concatMap(txid => {
				const next$ = this.actions$.pipe(
					ofType(TransactionHistoryActionTypes.LOAD_DETAIL),
					skip(1)
				)

				return this.apiProvider.get(`${API_CONSTANTS.HISTORY_DETAIL}/${txid}`)
									 .pipe(
										 takeUntil(next$),
										 map(transaction => transaction !== 404 && new LoadDetailSuccess(transaction)),
										 catchError(error => of(new LoadDetailFail(error)))
									 )
			})
		)

	constructor (
		private actions$: Actions,
		private apiProvider: ApiProvider,
		private store$: Store<RootState>
	) {}
}

// TODO: Move parse Tx to selector section
const mapTransactionHistory = (histories: TransactionHistory[], asset: (NEP5 | Global)[]) => {
	return histories.filter(history => Number(history.value)).map(history => {
		const coin = asset.find(c => c.id === history.asset || `0x${c.id}` === history.asset)
		const name = coin.name || 'none'
		const sym = Array.isArray(name) ? name[0].name : name
		const symbol = sym === '小蚁股' ? 'NEO'
			: sym === '小蚁币' ? 'GAS'
				: sym
		return { ...history, symbol }
	})
}
//const parseTxx = compose(rMap())

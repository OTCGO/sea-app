import { createFeatureSelector, createSelector } from '@ngrx/store'
import { find, compose, prop, filter, equals } from 'ramda'
import { getSelectedBalanceSymbol } from '../selectors/balances.selector'
import { State } from '../reducers/transaction-history.reducer'
import { TransactionHistory } from '../../shared/models'


export const getState = createFeatureSelector('transaction_history')
export const getEntities = createSelector(getState, (state: State) => state.entities)
export const getError = createSelector(getState, (state: State) => state.error)
export const getLoading = createSelector(getState, (state: State) => state.loading)
export const getSelectedTxid = createSelector(getState, (state: State) => state.selectedTxid)
export const getDetail = createSelector(getState, (state: State) => state.details)

export const getEntitiesBySelectedSymbol = createSelector(
	getEntities,
	getSelectedBalanceSymbol,
	(histories, symbol) => {
		console.log('getEntitiesBySelectedSymbol:histories', histories)
		console.log('getEntitiesBySelectedSymbol:symbol', symbol)
		return filter<TransactionHistory>(compose(equals(symbol), prop('symbol')), histories)
	}
)

export const getSelectedEntities = createSelector(
	getEntities,
	getSelectedTxid,
	(entities, txid) => find<TransactionHistory>(compose(equals(txid), prop('txid')))(entities)
)

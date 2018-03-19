import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State } from '../reducers/balances.reducer'

const getState = createFeatureSelector('balances')

export const getEntities = createSelector(
	getState,
	(state: State) => state.entities
)

export const getError = createSelector(
	getState,
	(state: State) => state.error
)

export const getLoading = createSelector(
	getState,
	(state: State) => state.loading
)

const getSelectedBalanceSymbol = createSelector(
	getState,
	(state: State) => state.selectedBalanceSymbol
)

const getSelectedBalance = createSelector(
	getEntities,
	getSelectedBalanceSymbol,
	(balances: any[], symbol) => balances && balances.find(balance => balance.symbol === symbol)
)

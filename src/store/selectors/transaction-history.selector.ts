import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State } from '../reducers/transaction-history.reducer'

export const getState = createFeatureSelector('transaction_history')

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

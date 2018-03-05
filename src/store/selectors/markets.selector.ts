import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State } from '../reducers/markets.reducer'

export const getMarketsState = createFeatureSelector('markets')

export const getEntities = createSelector(
	getMarketsState,
	(state: State) => state.entities
)

export const getLoading = createSelector(
	getMarketsState,
	(state: State) => state.loading
)

export const getError = createSelector(
	getMarketsState,
	(state: State) => state.error
)

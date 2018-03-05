import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State } from '../reducers/prices.reducer'

export const getPricesState = createFeatureSelector('prices')

export const getEntities = createSelector(
	getPricesState,
	(state: State) => state.entities
)

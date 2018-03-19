import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State } from '../reducers/prices.reducer'
import { getSelectedBalanceSymbol } from './balances.selector'

export const getPricesState = createFeatureSelector('prices')

export const getEntities = createSelector(
	getPricesState,
	(state: State) => state.entities
)

export const getPrice = createSelector(
	getEntities,
	getSelectedBalanceSymbol,
	(entities, symbol) => Number(entities[symbol]) || 0
)

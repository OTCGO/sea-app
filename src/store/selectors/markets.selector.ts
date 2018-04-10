import {
	createFeatureSelector,
	createSelector
} from '@ngrx/store'
import { State } from '../reducers/markets.reducer'
import {
	reduce,
	prop,
	compose,
	sum,
	max,
	min,
	map,
	head,
	Ord
} from 'ramda'
import { DetailData } from '../../shared/models/markets.model'

export const getMarketsState = createFeatureSelector('markets')
export const getEntities = createSelector(getMarketsState, (state: State) => state.entities)
export const getLoading = createSelector(getMarketsState, (state: State) => state.loading)
export const getError = createSelector(getMarketsState, (state: State) => state.error)
export const getDetails = createSelector(getMarketsState, (state: State) => state.detail)
export const getSelectedSymbol = createSelector(getMarketsState, (state: State) => state.selectedSymbol)

export const getHigh = createSelector(
	getDetails,
	details => compose<DetailData[], Array<number>, Ord>(
		reduce(max, 0),
		map(prop('high'))
	)(details)
)

export const getLow = createSelector(
	getDetails,
	details => compose<DetailData[], number[], Ord>(
		reduce(min, Infinity),
		map(prop('low'))
	)(details)
)

export const getVolume = createSelector(
	getDetails,
	details => compose<DetailData[], number[], number>(
		sum,
		map(prop('volumeto'))
	)(details)
)

export const getOpen = createSelector(
	getDetails,
	details => compose<DetailData[], DetailData, number>(
		prop('open'),
		head
	)(details)
)

export const getChangeData = createSelector(
	getOpen,
	getHigh,
	getLow,
	getVolume,
	(open, high, low, volume) => [open, high, low, volume / 1000]
)

export const getSelectedCoin = createSelector(
	getSelectedSymbol,
	getEntities,
	(symbol, entities) => entities && entities.find(coin => coin.symbol === symbol)
)

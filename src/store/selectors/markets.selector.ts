import {
	createFeatureSelector,
	createSelector
} from '@ngrx/store'
import { State } from '../reducers/markets.reducer'
import {
	last,
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
export const getPreMarketsLoadTime = createSelector(getMarketsState, (state: State) => state.preMarketsLoadTime)
export const getPreDetailsLoadTime = createSelector(getMarketsState, (state: State) => state.preDetailsLoadTime)


export const getHighest = createSelector(
	getDetails,
	compose<DetailData[], Array<number>, Ord>(
		reduce(max, 0),
		map(prop('high'))
	)
)

export const getLowest = createSelector(
	getDetails,
	compose<DetailData[], number[], Ord>(
		reduce(min, Infinity),
		map(prop('low'))
	)
)

export const getVolume = createSelector(
	getDetails,
	compose<DetailData[], number[], number>(
		sum,
		map(prop('volumeto'))
	)
)

export const getOpen = createSelector(
	getDetails,
	compose<DetailData[], DetailData, number>(
		prop('close'),
		head
	)
)

export const getClose = createSelector(
	getDetails,
	compose<DetailData[], DetailData, number>(
		prop('close'),
		last
	)
)

export const getChangePercentage = createSelector(
	getOpen,
	getClose,
	(open, close) => (close - open) / open * 100
)

export const getChangeData = createSelector(
	getOpen,
	getHighest,
	getLowest,
	getVolume,
	(open, high, low, volume) => [open, high, low, volume / 1000]
)

export const getSelectedCoin = createSelector(
	getSelectedSymbol,
	getEntities,
	(symbol, entities) => entities && entities.find(coin => coin.symbol === symbol)
)

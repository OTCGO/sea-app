import { ActionReducer, ActionReducerMap, createFeatureSelector, MetaReducer } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { dev } from '../environments/environment'
import * as fromBalances from './balances.reducer'
import * as fromMarkets from './markets.reducer'
import { InjectionToken } from '@angular/core'

export interface RootState {
	balances: fromBalances.State
}

export const reducers = {
	balances: fromBalances.reducer
}

export const reducerToken = new InjectionToken<ActionReducerMap<RootState>>('Reducers')

export const reducerProvider = [
	{ provide: reducerToken, useValue: reducers }
]



function logger (reducer: ActionReducer<RootState>): ActionReducer<RootState> {
	return (state, action): RootState => {
		console.group(action.type)
		const nextState = reducer(state, action)
		console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state)
		console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action)
		console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState)
		console.groupEnd()

		return nextState
	}
}

export const metaReducers: MetaReducer<RootState>[] = dev ? [logger, storeFreeze] : []

export const getBalancesState = createFeatureSelector<fromBalances.State>('balances')
export const getMarketsState = createFeatureSelector<fromMarkets.State>('markets')

export {
	fromBalances,
	fromMarkets
}

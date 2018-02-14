import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { dev } from '../environments/environment'
import * as fromBalances from './balances.reducer'


export interface RootState {
	balances: fromBalances.BalancesState
}

export const reducers: ActionReducerMap<RootState> = {
	balances: fromBalances.reducer
}

const logger = (reducer: ActionReducer<RootState>): ActionReducer<RootState> => {
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

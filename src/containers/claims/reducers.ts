import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store'
import { CounterActionTypes, CounterActions } from './couter.action'
import { AppState } from '../../modules/index'

export interface CounterState {
	value: number
}

export interface CounterFeature {
	counter: CounterState
}

export const reducers: ActionReducerMap<CounterFeature> = {
	counter: counterReducer
}

const initialCounterState = {
	value: 0
}

export function counterReducer (state: CounterState = initialCounterState, action: CounterActions): CounterState {
	switch (action.type) {
		case CounterActionTypes.INCREMENT:
			return {
				...state,
				value: ++state.value
			}

		case CounterActionTypes.DECREMENT:
			return {
				...state,
				value: --state.value
			}

		case CounterActionTypes.RESET:
			return {
				value: 0
			}

		default:
			return state
	}
}

export const selectCounterFeature = createFeatureSelector<CounterFeature>('counter-feature')

export const selectCounter = createSelector(selectCounterFeature, (state: any) => state.counter)

export const selectCounterValue = createSelector(selectCounter, (state: CounterState) => state.value)






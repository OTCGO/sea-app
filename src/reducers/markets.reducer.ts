import { PricesActionTypes, PricesActions } from '../actions/prices.action'
import { createSelector } from '@ngrx/store'
import { getMarketsState } from '.'

export interface State {
	entities: any[]
	error: string
	loading: boolean
}

const initialState: State = {
	entities: [],
	error: '',
	loading: false
}

export const reducers = (state = initialState, action: PricesActions): State => {
	switch (action.type) {
		case PricesActionTypes.LOAD_PRICES:
			return <State>{
				...state,
				loading: true
			}

		case PricesActionTypes.LOAD_PRICES_SUCCESS:
			return <State>{
				...state,
				entities: action.payload,
				loading: false
			}

		case PricesActionTypes.LOAD_PRICES_FAIL:
			return <State>{
				...state,
				error: action.payload,
				loading: false
			}

		default: return state
	}
}


export const getMarketsEneities = (state: State) => state.entities
export const getMarketsLoading = (state: State) => state.loading
export const getMarketsError = (state: State) => state.error

import { ActionReducer } from '@ngrx/store'
import { PricesActionTypes, PricesActions } from '../actions/prices.action'

export interface State {
	entities: any[]
}

const initialState: State = {
	entities: []
}

export const reducer: ActionReducer<State> = (state = initialState, action: PricesActions) => {
	switch (action.type) {
		case PricesActionTypes.LOAD:
			return {
				...state,
				entities: action.payload
			}

		default: return state
	}
}

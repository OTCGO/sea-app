import { ActionReducer, createSelector } from '@ngrx/store'
import { IBalance } from '../shared/balances.model'
import { BalancesActions, BalancesActionTypes } from '../actions'
import { getBalancesState } from './'

export interface State {
	entities?: IBalance[]
	error?: string
}

const initialBalancesState: State = {
	entities: null,
	error: null
}

export const reducer: ActionReducer<State> = function reducer (state = initialBalancesState, action: BalancesActions): State {
	switch (action.type) {
		case BalancesActionTypes.GET_ERROR:
			return {
				...state,
				error: action.payload
			}

		case BalancesActionTypes.GET_SUCCESS:
			return {
				...state,
				entities: action.payload
			}

		default:
			return state
	}
}

export const selectEntities = createSelector(
	getBalancesState,
	(state: State) => state.entities
)

export const selectError = createSelector(
	getBalancesState,
	(state: State) => state.error
)

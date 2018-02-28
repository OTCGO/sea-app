import { ActionReducer, createSelector } from '@ngrx/store'
import { IBalance } from '../shared/balances.model'
import { BALANCES_ACTIONS, GET_BALANCES_TYPES } from '../actions'

export interface BalancesState {
	entities?: IBalance[]
	error?: string
}

const initialBalancesState: BalancesState = {
	entities: null,
	error: null
}

export const reducer: ActionReducer<BalancesState> = (state = initialBalancesState, action: BALANCES_ACTIONS): BalancesState => {
	switch (action.type) {
		case GET_BALANCES_TYPES.GET_ERROR:
			return {
				...state,
				error: action.payload
			}

		case GET_BALANCES_TYPES.GET_SUCCESS:
			return {
				...state,
				entities: action.payload
			}

		default:
			return state
	}
}

export const selectBalancesFeature = (state) => state.balances

export const selectEntities = createSelector(
	selectBalancesFeature,
	(state: BalancesState) => state.entities
)

export const selectError = createSelector(
	selectBalancesFeature,
	(state: BalancesState) => state.error
)

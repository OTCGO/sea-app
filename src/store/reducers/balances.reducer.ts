import { ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store'
import { IBalance } from '../../shared/balances.model'
import { BalancesActions, BalancesActionTypes } from '../actions/balances.action'

export interface State {
	entities?: IBalance[]
	loading: boolean
	error: string
}

const initialBalancesState: State = {
	entities: [],
	loading: false,
	error: ''
}

export const reducer: ActionReducer<State> = (state = initialBalancesState, action: BalancesActions): State => {
	switch (action.type) {
		case BalancesActionTypes.LOAD:
			return {
				...state,
				loading: true
			}

		case BalancesActionTypes.LOAD_FAIL:
			return {
				...state,
				error: action.payload
			}

		case BalancesActionTypes.LOAD_SUCCESS:
			return {
				...state,
				entities: action.payload,
				loading: false
			}

		default:
			return state
	}
}

export const getBalancesState = createFeatureSelector('balances')

export const getEntities = createSelector(
	getBalancesState,
	(state: State) => state.entities
)

export const getError = createSelector(
	getBalancesState,
	(state: State) => state.error
)

export const getLoading = createSelector(
	getBalancesState,
	(state: State) => state.loading
)


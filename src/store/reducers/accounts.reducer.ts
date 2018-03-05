import { ActionReducer } from '@ngrx/store'
import { AccountsActions, AccountsActionTypes } from '../actions/accounts.action'

export interface State {
	entities: any[]
	error: string | Error
	loading: boolean
}

const initialState: State = {
	entities: [],
	error: '',
	loading: false
}

export const reducer: ActionReducer<State> = (state = initialState, action: AccountsActions) => {
	switch (action.type) {
		case AccountsActionTypes.LOAD:
			return {
				...state,
				loading: true
			}

		case AccountsActionTypes.LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				entities: action.payload
			}

		case AccountsActionTypes.LOAD_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		default: return state
	}
}

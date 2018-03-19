import { ActionReducer } from '@ngrx/store'
import {
	TransactionHistoryActions,
	TransactionHistoryActionTypes
} from '../actions/transaction-history.action'

export interface State {
	entities: any[]
	loading: boolean
	error?: string | Error
}

const initialState: State = {
	entities: [],
	loading: false,
	error: null
}

export const reducer: ActionReducer<State> = (
	state = initialState,
	action: TransactionHistoryActions
): State => {
	switch (action.type) {
		case TransactionHistoryActionTypes.LOAD: {
			return {
				...state,
				loading: true
			}
		}

		case TransactionHistoryActionTypes.LOAD_FAIL: {
			return {
				...state,
				error: action.payload,
				loading: false
			}
		}

		case TransactionHistoryActionTypes.LOAD_SUCCESS: {
			return {
				...state,
				entities: action.payload,
				loading: true
			}
		}

		default: return state
	}
}

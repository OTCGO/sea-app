import { ActionReducer } from '@ngrx/store'
import {
	TransactionHistoryActions,
	TransactionHistoryActionTypes
} from '../actions/transaction-history.action'

export interface State {
	entities: any[]
	details: any[]
	loading: boolean
	error?: string | Error
}

const initialState: State = {
	entities: [],
	details: [],
	loading: false,
	error: null,
}

export const reducer: ActionReducer<State> = (
	state = initialState,
	action: TransactionHistoryActions
): State => {
	switch (action.type) {
		case TransactionHistoryActionTypes.LOAD:
		case TransactionHistoryActionTypes.LOAD_DETAIL: {
			return {
				...state,
				loading: true
			}
		}

		case TransactionHistoryActionTypes.LOAD_FAIL:
		case TransactionHistoryActionTypes.LOAD_DETAIL_FAIL: {
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

		case TransactionHistoryActionTypes.LOAD_DETAIL_SUCCESS: {
			return {
				...state,
				details: action.payload,
				loading: false
			}
		}

		default: return state
	}
}

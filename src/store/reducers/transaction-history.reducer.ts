import { ActionReducer } from '@ngrx/store'
import { TransactionHistory } from '../../shared/models'
import {
	TransactionHistoryActions,
	TransactionHistoryActionTypes
} from '../actions/transaction-history.action'
import { MockTransactionHistories } from './mockData'

export interface State {
	entities: TransactionHistory[]
	details: any[]
	loading: boolean
	error?: string | Error
	selectedTxid: string
}

const initialState: State = {
	entities: MockTransactionHistories,
	details: [],
	loading: false,
	error: null,
	selectedTxid: ''
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

		case TransactionHistoryActionTypes.SELECT: {
			return {
				...state,
				selectedTxid: action.payload
			}
		}

		default: return state
	}
}

import { ActionReducer } from '@ngrx/store'
import { MarketsActionTypes, MarketsActions } from '../actions/markets.action'


export interface State {
	loading: boolean
	error: string | Error
	detail: any[]
	entities: any[]
	selectedSymbol: string
}
// TODO: Remove MockData
const initialState: State = {
	loading: false,
	error: '',
	detail: [],
	entities: [],
	selectedSymbol: ''
}

export const reducer: ActionReducer<State> = (state = initialState, action: MarketsActions): State => {
	switch (action.type) {
		case MarketsActionTypes.LOAD:
		case MarketsActionTypes.LOAD_DETAIL: {
			return {
				...state,
				loading: true
			}
		}			

		case MarketsActionTypes.LOAD_SUCCESS: {
			return {
				...state,
				entities: action.payload,
				loading: false
			}
		}

		case MarketsActionTypes.LOAD_DETAIL_SUCCESS: {
			return {
				...state,
				detail: action.payload,
				loading: false
			}
		}

		case MarketsActionTypes.LOAD_FAIL:
		case MarketsActionTypes.LOAD_DETAIL_FAIL: {
			return {
				...state,
				error: action.payload,
				loading: false
			}
		}

		case MarketsActionTypes.SELECT: {
			return {
				...state,
				selectedSymbol: action.payload
			}
		}

		default: return state
	}
}

import { ActionReducer } from '@ngrx/store'
import { MarketsActionTypes, MarketsActions } from '../actions/markets.action'


export interface State {
	loading: boolean
	error: string | Error
	detail: any[]
	entities: any[]
	preMarketsLoadTime: number,
	preDetailsLoadTime: number,
	selectedSymbol: string
}

const initialState: State = {
	loading: false,
	error: '',
	detail: [],
	entities: [],
	preMarketsLoadTime: 0,
	preDetailsLoadTime: 0,
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

		case MarketsActionTypes.UPDATE_MARKETS_LOAD_TIME: {
			return {
				...state,
				preMarketsLoadTime: Date.now()
			}
		}

		case MarketsActionTypes.UPDATE_DETAILS_LOAD_TIME: {
			return {
				...state,
				preDetailsLoadTime: Date.now()
			}
		}

		default: return state
	}
}

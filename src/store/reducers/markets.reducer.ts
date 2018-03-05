import { ActionReducer } from '@ngrx/store'
import { MarketsActionTypes, MarketsActions } from '../actions/markets.action'

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

export const reducer: ActionReducer<State> = (state = initialState, action: MarketsActions): State => {
	switch (action.type) {
		case MarketsActionTypes.LOAD:
			return <State>{
				...state,
				loading: true
			}

		case MarketsActionTypes.LOAD_SUCCESS:
			return <State>{
				...state,
				entities: action.payload,
				loading: false
			}

		case MarketsActionTypes.LOAD_FAIL:
			return <State>{
				...state,
				error: action.payload,
				loading: false
			}

		default: return state
	}
}

import { ActionReducer } from '@ngrx/store'
import { Claims } from '../../shared/models'
import {
	ClaimsActions,
	ClaimsActionTypes
} from '../actions/claims.action'

export interface State {
	entities?: Claims
	loading: boolean
	error: Error | string
}

const initialState: State = {
	entities: null,
	loading: false,
	error: ''
}

// export const reducer: ActionReducer<State> = (state = initialState, action: ClaimsActions): State => {


export function reducer(state = initialState, action: ClaimsActions): State {
	switch (action.type) {
		case ClaimsActionTypes.LOAD:
		case ClaimsActionTypes.DO_CLAIM:
		case ClaimsActionTypes.DO_CLAIM_SUCCESS: {
			return {
				...state,
				loading: true
			}
		}

		case ClaimsActionTypes.LOAD_FAIL:
		case ClaimsActionTypes.DO_CLAIM_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		case ClaimsActionTypes.LOAD_SUCCESS: {
			return {
				...state,
				loading: true,
				entities: action.payload
			}
		}

		default: return state
	}
}

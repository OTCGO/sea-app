import { ActionReducer } from '@ngrx/store'
import { Version } from '../../shared/models'
import { VersionActions, VersionActionTypes } from '../actions/version.action'

export interface State {
	entities?: Version
	error: string | Error
}

const initialVersionState: State = {
	entities: null,
	error: ''
}

export const reducer: ActionReducer<State> = (state = initialVersionState, action: VersionActions): State => {
	switch (action.type) {
		case VersionActionTypes.LOAD: {
			return {
				...state,
			}
		}

		case VersionActionTypes.LOAD_FAIL: {
			return {
				...state,
				error: action.payload
			}
		}

		case VersionActionTypes.LOAD_SUCCESS: {
			console.log('VersionActionTypes.LOAD_SUCCESS', action.payload)
			return {
				...state,
				entities: action.payload,
			}
		}

		default:
			return state
	}
}

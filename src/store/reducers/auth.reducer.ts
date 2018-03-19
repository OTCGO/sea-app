import { ActionReducer } from '@ngrx/store'
import { AuthActionTypes, AuthActions } from '../actions/auth.action'

export interface State {
	loading: boolean
	error: string
}

const initialBalancesState: State = {
	loading: false,
	error: ''
}

export const reducer: ActionReducer<State> = (state = initialBalancesState, action: AuthActions): State => {
	switch (action.type) {
		case AuthActionTypes.LOGIN:
		case AuthActionTypes.LOGIN_WIF:
		case AuthActionTypes.LOGIN_OLD_WALLET:
		case AuthActionTypes.LOGIN_LEDGER:
		case AuthActionTypes.LOGIN_NEO_DUN:
		case AuthActionTypes.CREATE_WALLET: {
			return {
				...state,
				loading: true
			}
		}


		case AuthActionTypes.LOGIN_FAIL:
		case AuthActionTypes.LOGIN_WIF_FAIL:
		case AuthActionTypes.LOGIN_OLD_WALLET_FAIL:
		case AuthActionTypes.LOGIN_LEDGER_FAIL:
		case AuthActionTypes.LOGIN_NEO_DUN_FAIL:
		case AuthActionTypes.CREATE_WALLET_FAIL: {
				return {
				...state,
				error: action.payload,
				loading: false
			}
		}


		case AuthActionTypes.LOGIN_SUCCESS:
		case AuthActionTypes.LOGIN_WIF_SUCCESS:
		case AuthActionTypes.LOGIN_OLD_WALLET_SUCCESS:
		case AuthActionTypes.LOGIN_LEDGER_SUCCESS:
		case AuthActionTypes.LOGIN_NEO_DUN_SUCCESS:
		case AuthActionTypes.CREATE_WALLET_SUCCESS: {
			return {
				...state,
				loading: false
			}
		}


		default:
			return state
	}
}

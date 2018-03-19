
import { ActionReducer } from '@ngrx/store'
import { WalletActions, WalletActionTypes } from '../actions/wallet.action'
import { AuthActions, AuthActionTypes } from '../actions/auth.action'
import { Wallet } from '../../libs/neon/src/wallet'
import { wallet } from '../../libs/neon'
import { DEFAULT_EMPTY_WALLET } from '../../shared/constants'


export interface State {
	error: string | Error
	loading: boolean
	entity: Wallet
}

const initialState: State = {
	error: '',
	loading: false,
	entity: new wallet.Wallet(DEFAULT_EMPTY_WALLET)
}

export const reducer: ActionReducer<State> = (
	state = initialState,
	action: WalletActions | AuthActions
): State => {
	switch (action.type) {
		case WalletActionTypes.ADD_ACCOUNT: {
			return {
				...state,
				entity: {
					...state.entity,
					accounts: [
						...state.entity.accounts,
						action.payload
					]
				}
			}
		}

		case WalletActionTypes.LOAD:
		case AuthActionTypes.LOGIN_OLD_WALLET: {
			return {
				...state,
				loading: true
			}
		}

		case WalletActionTypes.LOAD_FAIL:
		case WalletActionTypes.ADD_ACCOUNT_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		}

		case WalletActionTypes.LOAD_SUCCESS:
		case AuthActionTypes.LOGIN_SUCCESS: {
			return {
				...state,
				loading: false,
				entity: action.payload
			}
		}

		case WalletActionTypes.ADD_ACCOUNT_SUCCESS: {
			return {
				...state,
				loading: false
			}
		}

		default: return state
	}
}

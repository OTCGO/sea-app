import { ActionReducer } from '@ngrx/store'
import { WalletActions, WalletActionTypes } from '../actions/wallet.action'
import { DEFAULT_EMPTY_WALLET } from '../../providers/wallet/wallet.consts'
import { wallet } from '../../libs/neon'

export interface State {
	error: string | Error
	loading: boolean
	data: wallet.WalletFile
}

const initialState: State = {
	error: '',
	loading: false,
	data: DEFAULT_EMPTY_WALLET
}

export const reducer: ActionReducer<State> = (state = initialState, action: WalletActions): State => {
	switch (action.type) {
		case WalletActionTypes.LOAD: {
			return {
				...state,
				loading: true
			}
		}

		case WalletActionTypes.LOAD_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		case WalletActionTypes.LOAD_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload
			}
		}

		default: return state
	}
}

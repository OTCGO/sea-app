import { ActionReducer } from '@ngrx/store'
import { IBalanceEntities } from '../../shared/models'
import { BalancesActions, BalancesActionTypes } from '../actions/balances.action'
// import { balanceSort } from '../../shared/utils'


export interface State {
	selectedBalanceSymbol: string
	entities?: IBalanceEntities
	loading: boolean
	error: string | Error
}

const initialBalancesState: State = {
	selectedBalanceSymbol: '',
	entities: {},
	loading: false,
	error: ''
}

export const reducer: ActionReducer<State> = (state = initialBalancesState, action: BalancesActions): State => {
	switch (action.type) {
		case BalancesActionTypes.LOAD: {
			return {
				...state,
				loading: true
			}
		}

		case BalancesActionTypes.LOAD_FAIL: {
			return {
				...state,
				error: action.payload
			}
		}

		case BalancesActionTypes.LOAD_SUCCESS: {
			console.log('BalancesActionTypes.LOAD_SUCCESS', action.payload)
			// console.log('BalancesActionTypes.LOAD_SUCCESS',  Object.keys(action.payload)[0])
			// const address = Object.keys(action.payload)[0]
			// console.log('BalancesActionTypes.LOAD_SUCCESS:address', address)
			// const result = balanceSort(action.payload[address])

			// console.log('BalancesActionTypes.LOAD_SUCCESS:result', result)

			// action.payload[address] = result

			return {
				...state,
				entities: action.payload,
				loading: false
			}
		}

		case BalancesActionTypes.SELECT: {
			console.log('BalancesActionTypes.SELECT', action.payload)
			return {
				...state,
				selectedBalanceSymbol: action.payload
			}
		}

		case BalancesActionTypes.CLEAN_SELECTED_COIN: {
			return {
				...state,
				selectedBalanceSymbol: ''
			}
		}

		default:
			return state
	}
}

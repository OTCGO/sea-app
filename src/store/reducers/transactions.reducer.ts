import { ActionReducer } from '@ngrx/store'
import {
	SelectContact,
	TransactionsActions,
	TransactionsActionTypes
} from '../actions/transactions.action'

export interface State {
	selectedAddress: string
}

const initialState: State = {
	selectedAddress: ''
}

// export const reducer: ActionReducer<State> = (state = initialState, action: TransactionsActions): State => {


	export function reducer(state = initialState, action: TransactionsActions): State {
	switch (action.type) {
		case TransactionsActionTypes.SELECT_CONTACT: {
			return {
				...state,
				selectedAddress: action.payload
			}
		}

		case TransactionsActionTypes.CLEAN_SELECTED_CONTACT: {
			return {
				...state,
				selectedAddress: ''
			}
		}

		default: return state
	}
}

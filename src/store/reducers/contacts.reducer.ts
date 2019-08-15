import { ActionReducer } from '@ngrx/store'
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'
import {
	ContactsActions,
	ContactsActionTypes
} from '../actions/contacts.action'
import { Contact } from '../../shared/models'

export interface State extends EntityState<Contact> {
	selectedAddress: string
	loading: boolean
	error: string | Error
}

export const adapter: EntityAdapter<Contact> = createEntityAdapter({ selectId: contact => contact.address })

const initialState: State = adapter.getInitialState({
	selectedAddress: '',
	loading: false,
	error: ''
})

// export const reducer: ActionReducer<State> = (state = initialState, action: ContactsActions): State => {
	export function reducer(state = initialState, action: ContactsActions): State {

	switch (action.type) {
		case ContactsActionTypes.LOAD:
			return {
				...state,
				loading: true
			}

		case ContactsActionTypes.LOAD_FAIL:
			return {
				...state,
				error: action.payload,
				loading: false
			}

		case ContactsActionTypes.SELECT:
			return {
				...state,
				selectedAddress: action.payload
			}

		case ContactsActionTypes.CLEAN_SELECT:
			return {
				...state,
				selectedAddress: ''
			}

		case ContactsActionTypes.LOAD_SUCCESS:
			return adapter.addAll(action.payload, state)

		case ContactsActionTypes.REMOVE:
			return adapter.removeOne(action.payload.address, {
				...state,
				selectedAddress: state.selectedAddress
			})

		case ContactsActionTypes.UPDATE:
			return adapter.upsertOne(action.payload, {
				...state,
				selectedAddress: state.selectedAddress
			})

		default: return state
	}
}

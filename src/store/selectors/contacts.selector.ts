import { EntityState } from '@ngrx/entity'
import {
	createFeatureSelector,
	createSelector
} from '@ngrx/store'
import { adapter, State } from '../reducers/contacts.reducer'
import { Contact } from '../../shared/models'

const getState = createFeatureSelector<EntityState<Contact>>('contacts')
export const getSelectedAddress = createSelector(getState, (state: State) => state.selectedAddress)

export const {
	selectIds: getAddresses,
	selectEntities: getEntities,
	selectAll: getAll,
	selectTotal: getTotal
} = adapter.getSelectors(getState)

export const getSelectedContact = createSelector(
	getEntities,
	getSelectedAddress,
	(entities, address) => entities && entities[address]
)

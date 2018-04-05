import {
	createFeatureSelector,
	createSelector
} from '@ngrx/store'
import { adapter, State } from '../reducers/contacts.reducer'

const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal
} = adapter.getSelectors()

const getState = createFeatureSelector('contacts')

export const getEntities = createSelector(getState, selectEntities)

export const getAddresses = createSelector(getState, selectIds)

export const getTotal = createSelector(getState, selectTotal)

export const getAll = createSelector(getState, selectAll)

export const getSelectedAddress = createSelector(
	getState,
	(state: State) => state.selectedAddress
)

export const getSelectedContact = createSelector(
	getEntities,
	getSelectedAddress,
	(entities, address) => entities && entities[address]
)

import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State } from '../reducers/wallet.reducer'

const getState = createFeatureSelector('wallet')

export const getEntity = createSelector(
	getState,
	(state: State) => state.entity
)

export const getAccounts = createSelector(
	getState,
	(state: State) => state.entity.accounts
)

export const getAccount = createSelector(
	getState,
	(state: State) => state.entity.accounts.find(account => account.isDefault) || null
)

export const getExits = createSelector(
	getState,
	(state: State) => !!state.entity.accounts.length
)

export const getError = createSelector(
	getState,
	(state: State) => state.error
)

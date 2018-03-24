import { createFeatureSelector, createSelector } from '@ngrx/store'
import { Wallet } from '../../shared/typings'
import { findDefaultAccount } from '../../shared/utils'
import { State } from '../reducers/wallet.reducer'

const getState = createFeatureSelector('wallet')

export const getEntity = createSelector(
	getState,
	(state: State) => state.entity
)

export const getError = createSelector(
	getState,
	(state: State) => state.error
)

export const getAccounts = createSelector(
	getEntity,
	(wallet: Wallet) => wallet.accounts
)

export const getAccount = createSelector(
	getEntity,
	wallet => findDefaultAccount(wallet) || {}
)

export const getExits = createSelector(
	getEntity,
	wallet => !!wallet.accounts.length
)

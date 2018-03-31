import { createFeatureSelector, createSelector } from '@ngrx/store'
import { IBalance } from '../../shared/models'
import { getAccount } from './wallet.selector'
import { State } from '../reducers/balances.reducer'
import { isEmpty } from '../../shared/utils'

const getState = createFeatureSelector('balances')

export const getEntities = createSelector(
	getState,
	(state: State) => state.entities
)

export const getNonZeroEntities = createSelector(
	getEntities,
	entities => entities && !isEmpty(Object.keys(entities)) && Object.entries(entities)
																							.reduce((acc, [address, balances]) =>
																									({
																										...acc,
																										[address]: balances.filter(b => b.amount.toNumber() > 0)
																									}),
																								{}
																							)
)

export const getEntitiesByAddress = address => createSelector(
	getEntities,
	entities => address in entities && entities[address]
)

export const getDefaultEntities = createSelector(
	getAccount,
	getEntities,
	(account, entities) => account && entities && !isEmpty(entities[account.address]) && entities[account.address]
)

export const getDefaultNonZeroEntities = createSelector(
	getDefaultEntities,
	entities => entities && !isEmpty(entities) && entities.filter(balance => balance.amount.toNumber() > 0)
)

export const getError = createSelector(
	getState,
	(state: State) => state.error
)

export const getLoading = createSelector(
	getState,
	(state: State) => state.loading
)

export const getSelectedBalanceSymbol = createSelector(
	getState,
	(state: State) => state.selectedBalanceSymbol
)

export const getSelectedBalance = createSelector(
	getDefaultEntities,
	getSelectedBalanceSymbol,
	(balances: IBalance[], symbol) => balances && !isEmpty(balances) && balances.find(balance => balance.symbol === symbol)
)

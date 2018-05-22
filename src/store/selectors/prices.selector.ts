import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State } from '../reducers/prices.reducer'
import { IBalance } from '../../shared/models'
import {
	getNonZeroEntities,
	getSelectedBalanceSymbol
} from './balances.selector'
import {
	getAccount,
	getAccounts
} from './wallet.selector'
import { compose, map, reduce, values } from 'ramda'

export const getPricesState = createFeatureSelector('prices')
export const getEntities = createSelector(getPricesState, (state: State) => state.entities)

export const getSelectedPrice = createSelector(
	getEntities,
	getSelectedBalanceSymbol,
	(entities, symbol) => Number(entities[symbol.toUpperCase()]) || 0
)

export const getPriceBySymbol = symbol => createSelector(
	getEntities,
	entities => entities && entities[symbol.toUpperCase()]
)

// TODO: Move those selectors to balances.selector, shall we?
export const getAmounts = createSelector(
	getEntities,
	getNonZeroEntities,
	(prices, balances) => compose(
		map(reduce((acc, { amount, symbol }) => acc + amount * (Number(prices[symbol]) || 0), 0)),
		values
	)(balances)
)

export const getGASAmounts = createSelector(
	getEntities,
	getAmounts,
	(prices, amounts) => amounts.map(amount => amount / (Number(prices['GAS']) || 1))
)

export const getDefaultAccountAmount = createSelector(
	getAmounts,
	getAccount,
	getAccounts,
	(amounts, account, accounts) => amounts[accounts.indexOf(account)] || 0
)

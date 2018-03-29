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

export const getPricesState = createFeatureSelector('prices')

export const getEntities = createSelector(
	getPricesState,
	(state: State) => state.entities
)

export const getSelectedPrice = createSelector(
	getEntities,
	getSelectedBalanceSymbol,
	(entities, symbol) => Number(entities[symbol]) || 0
)


// TODO: Move those selectors to balances.selector, shall we?
export const getAmounts = createSelector(
	getEntities,
	getNonZeroEntities,
	(prices, balances) => Object.values<IBalance[]>(balances).map(
			(balances: IBalance[]) => balances.reduce(
				(acc, { amount, symbol }) => acc + amount.times(prices[symbol] || 0).toNumber(),
				0
			)
		)
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

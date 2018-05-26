import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store'
import { IBalance, } from '../../shared/models'
import { getAccount } from './wallet.selector'
import { State } from '../reducers/balances.reducer'
import { sort, compose, prop, lt, filter, not, toPairs, isEmpty } from 'ramda'

const getState = createFeatureSelector('balances')
export const getEntities = createSelector(getState, (state: State) => state.entities)
export const getError = createSelector(getState, (state: State) => state.error)
export const getLoading = createSelector(getState, (state: State) => state.loading)
export const getSelectedBalanceSymbol = createSelector(getState, (state: State) => state.selectedBalanceSymbol)

export const getNonZeroEntities = createSelector(
	getEntities,
	entities => not(isEmpty(entities)) &&
		toPairs(entities).reduce(
			(acc, [address, balances]) => ({ ...acc, [address]: balances.filter(b => b.amount > 0) }),
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
	(account, entities) =>
		account && entities && entities[account.address] &&
		!isEmpty(entities[account.address]) &&
		sort<IBalance>((a, b) => b.amount - a.amount, entities[account.address]),

)

export const getDefaultNonZeroEntities = createSelector(
	getDefaultEntities,
	entities =>
		entities && !isEmpty(entities) && filter<IBalance>(compose(lt(0), prop('amount')))(entities)
)

export const getSelectedBalance = createSelector(
	getDefaultEntities,
	getSelectedBalanceSymbol,
	(balances: IBalance[], symbol) => symbol && balances && !isEmpty(balances) && balances.find(balance => balance.symbol === symbol)
)

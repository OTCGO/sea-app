import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store'
import { IBalance, } from '../../shared/models'
import { getAccount } from './wallet.selector'
import { State } from '../reducers/balances.reducer'
import { sort, compose, prop, lt, filter, not, toPairs, isEmpty, is } from 'ramda'



const getState = createFeatureSelector('balances')
export const getEntities = createSelector(getState, (state: State) => {

	return state.entities
})
export const getError = createSelector(getState, (state: State) => state.error)
export const getLoading = createSelector(getState, (state: State) => state.loading)
export const getSelectedBalanceSymbol = createSelector(getState, (state: State) => state.selectedBalanceSymbol)

export const getNonZeroEntities = createSelector(
	getEntities,
	entities => not(isEmpty(entities)) &&
		toPairs(entities).reduce(
			(acc, [address, balances]) => ({ ...acc, [address]: balances.filter(b => Number(b.amount) > 0) }),
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
		sort<IBalance>((a, b) => Number(b.amount) - Number(a.amount), entities[account.address])


)

const isNotZero = n => Number(n) > 0
export const getDefaultNonZeroEntities = createSelector(
	getDefaultEntities,
	entities =>
		entities && !isEmpty(entities) && filter<IBalance>(compose(isNotZero, prop('amount')))(entities)
)

export const getSelectedBalance = createSelector(
	getDefaultEntities,
	getSelectedBalanceSymbol,
	(balances: IBalance[], symbol) => {
		// console.log('getSelectedBalance:balances', balances)
		// console.log('getSelectedBalance:symbol', symbol)
		return symbol && balances && !isEmpty(balances) && balances.find(balance => balance.symbol === symbol)
	}
)


// ontology-ONG
export const getOngBalance = createSelector(
	getAccount,
	getEntities,
	(account, entities) =>
		account && entities && entities[account.address] &&
		!isEmpty(entities[account.address]) &&
		entities[account.address].find(balance => balance.symbol === 'ontology-ONG')

)


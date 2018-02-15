import { createSelector } from '@ngrx/store'
import { ASSET_ENUM } from '../shared/constants'
import { IBalance } from '../shared/balances.model'
import { BALANCES_ACTIONS, GET_BALANCES_TYPES } from '../actions'

export interface BalancesState {
	entities: any
	error?: string
}

const initialBalancesState: BalancesState = {
	entities: {},
	error: null
}

export const reducer = (state: BalancesState = initialBalancesState, action: BALANCES_ACTIONS): BalancesState => {
	switch (action.type) {
		case GET_BALANCES_TYPES.GET_ERROR:
			return {
				...state,
				error: action.payload
			}

		case GET_BALANCES_TYPES.GET_SUCCESS:
			return {
				...state,
				entities: action.payload
			}

		default:
			return state
	}
}

console.log('magic')

export const selectBalances = (state) => state.balances

export const getEntities = createSelector(
	selectBalances,
	(state: BalancesState) => state.entities
)

export const getError = createSelector(
	selectBalances,
	(state: BalancesState) => state.error
)

export const getBalances = createSelector(
	getEntities,
	(entities) =>
	  entities.balances
		  && Object.keys(entities.balances)
		          .map(key => (
			          <IBalance>{
				          hash: key,
				          symbol: ASSET_ENUM[key] || '暂无',
				          amount: entities.balances[key]
			          })
		          )
)



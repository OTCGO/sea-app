import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { dev } from '../../environments/environment'

import * as fromBalances from './balances.reducer'
import * as fromMarkets from './markets.reducer'
import * as fromPrices from './prices.reducer'
import * as fromWallet from './wallet.reducer'
import * as fromAuth from './auth.reducer'
import * as fromTransactionHistory from './transaction-history.reducer'
import * as fromSettings from './settings.reducer'
import * as fromContacts from './contacts.reducer'
import * as fromTransactions from './transactions.reducer'

export interface RootState {
	balances: fromBalances.State
	markets: fromMarkets.State,
	prices: fromPrices.State,
	wallet: fromWallet.State,
	auth: fromAuth.State,
	transaction_history: fromTransactionHistory.State,
	settings: fromSettings.State,
	contacts: fromContacts.State,
	transactions: fromTransactions.State
}

export const reducers: ActionReducerMap<RootState> = {
	balances: fromBalances.reducer,
	markets: fromMarkets.reducer,
	prices: fromPrices.reducer,
	wallet: fromWallet.reducer,
	auth: fromAuth.reducer,
	transaction_history: fromTransactionHistory.reducer,
	settings: fromSettings.reducer,
	contacts: fromContacts.reducer,
	transactions: fromTransactions.reducer
}


function logger (reducer: ActionReducer<RootState>): ActionReducer<RootState> {
	return (state, action): RootState => {
		console.group(action.type)
		const nextState = reducer(state, action)
		console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state)
		console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action)
		console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState)
		console.groupEnd()

		return nextState
	}
}

export const metaReducers: MetaReducer<RootState>[] = dev ? [logger, storeFreeze] : []

export {
	fromBalances,
	fromMarkets,
	fromPrices,
	fromWallet,
	fromAuth,
	fromTransactionHistory,
	fromSettings,
	fromTransactions
}

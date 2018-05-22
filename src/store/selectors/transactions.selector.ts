import {
	createFeatureSelector,
	createSelector
} from '@ngrx/store'
import { State } from '../reducers/transactions.reducer'

const getState = createFeatureSelector('transactions')
export const getSelectedAddress = createSelector(getState, (state: State) => state.selectedAddress)

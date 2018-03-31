import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State } from '../reducers/auth.reducer'

const getState = createFeatureSelector('auth')

export const getError = createSelector(
	getState,
	(state: State) => state.error
)

export const getLoading = createSelector(
	getState,
	(state: State) => state.loading
)

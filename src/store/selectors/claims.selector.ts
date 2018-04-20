import {
	createFeatureSelector,
	createSelector
} from '@ngrx/store'
import { State } from '../reducers/claims.reducer'

const getState = createFeatureSelector('claims')
export const getEntities = createSelector(getState, (state: State) => state.entities)
export const getError = createSelector(getState, (state: State) => state.error)
export const getLoading = createSelector(getState, (state: State) => state.loading)

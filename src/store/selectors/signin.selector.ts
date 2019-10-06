import { createFeatureSelector, createSelector } from '@ngrx/store'
import { State } from '../reducers/signin.reducer'

const getState = createFeatureSelector('signin')
export const getError = createSelector(getState, (state: State) => state.error)
export const getLoading = createSelector(getState, (state: State) => state.loading)
export const getEntities = createSelector(getState, (state: State) => {
    return state.entities;
})
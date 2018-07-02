import {
	createFeatureSelector,
	createSelector,
	MemoizedSelector
} from '@ngrx/store'
import { State } from '../reducers/version.reducer'

const getState = createFeatureSelector('version')
export const getEntities = createSelector(getState, (state: State) => state.entities)



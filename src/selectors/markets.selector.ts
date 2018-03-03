import { createSelector } from '@ngrx/store'

import * as fromRoot from '../reducers'
import * as fromMarkets from '../reducers/markets.reducer'

export const getMarketsEntities = createSelector(
	fromRoot.getMarketsState,
	fromMarkets.getMarketsEneities
)

export const getMarketsLoading = createSelector(
	fromRoot.getMarketsState,
	fromMarkets.getMarketsLoading
)

export const getMarketsError = createSelector(
	fromRoot.getMarketsState,
	fromMarkets.getMarketsError
)

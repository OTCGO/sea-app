import { TestBed } from '@angular/core/testing'
import { Actions } from '@ngrx/effects'
import { cold, hot, getTestScheduler } from 'jasmine-marbles'
import { empty } from 'rxjs/observable/empty'
import { MarketsEffects } from './markets.effect'
import { Load, LoadSuccess, LoadFail } from '../actions/markets.action'
import { Observable } from 'rxjs/Observable'

export class TestActions extends Actions {
	constructor () {
		super(empty())
	}

	set stream (source: Observable<any>) {
		this.source = source
	}
}

export function getActions() {
	return new TestActions()
}

describe('MarketsEffects', () => {
	let effects: MarketsEffects
	let actions$: TestActions

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MarketsEffects,
				{ provide: Actions, useClass: TestActions }
			]
		})

		effects = TestBed.get(MarketsEffects)
		actions$ = TestBed.get(Actions)
	})

	describe('load$', () => {
		it('should return a new marketsActions.Load, with the markets, on success, after the de-bounce', () => {
			const market1 = {
				symbol: 'NEO',
				currentPrice: '66.5875',
				percent_change_1h: '3.07',
				percent_change_24h: '5.79',
				percent_change_7d: '-6.51'
			}
			const market2 = {
				symbol: 'GAS',
				currentPrice: '28.7096',
				percent_change_1h: '1.66',
				percent_change_24h: '6.09',
				percent_change_7d: '-13.62'
			}
			const markets = [market1, market2]
			const action = new Load()
			const completion = new LoadSuccess(markets)

			actions$.stream = hot('-a---', { a: action })
			const response = cold('-a|', { a: markets })
			const expected = cold('-----b', { b: completion })
			const get = () => response

			console.log(effects.load$)
		})
	})
})



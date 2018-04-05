import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { RootState } from '@store/reducers'
import {
	IonicPage,
	NavParams
} from 'ionic-angular'
import { MarketsActions } from '../../../store/actions'
import {
	MarketsSelectors,
	PricesSelectors
} from '../../../store/selectors'

const translationPrefix = 'MARKETS.DETAILS.'

@IonicPage({
	name: 'MarketDetail',
	segment: 'market-detail'
})
@Component({
	selector: 'page-market-detail',
	templateUrl: 'market-detail.html'
})
export class MarketDetailPage {
	selectedCoin = this.navParams.data.coin
	perGas = this.navParams.data.perGas

	histories = this.store.select(MarketsSelectors.getDetails)
	changeData = this.store.select(MarketsSelectors.getChangeData)
	gasPrice = this.store.select(PricesSelectors.getPriceBySymbol('gas'))

	currentDuration = 'hour'
	durationsProp = ['hour', 'day', 'week', 'month']
	changeTitlesProp = ['open', 'high', 'low', 'volume']
	changeTitles
	durations

	constructor (
		public navParams: NavParams,
		private ts: TranslateService,
		private store: Store<RootState>
	) {
		const durationsKeys = this.durationsProp.map(key => translationPrefix + key)
		const changeTitlesKeys = this.changeTitlesProp.map(key => translationPrefix + key)
		const translationKeys = durationsKeys.concat(changeTitlesKeys)

		this.ts.get(translationKeys).subscribe(
			titles => {
				this.changeTitles = this.changeTitlesProp.map(key => titles[translationPrefix + key])
				this.durations = this.durationsProp.reduce((acc, key) => ({
					...acc,
					[key]: titles[translationPrefix + key]
				}), {})
			}
		)
	}

	ngOnInit () {
		this.store.dispatch(new MarketsActions.LoadDetail())
	}

	handleDurationsClick (index) {
		const selectedDuration = this.durationsProp[index]
		this.store.dispatch(new MarketsActions.LoadDetail(selectedDuration))
		this.currentDuration = selectedDuration
	}
}

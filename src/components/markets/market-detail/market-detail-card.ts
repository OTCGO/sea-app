import {
	Component,
	EventEmitter,
	Input,
	Output
} from '@angular/core'
import { Coin } from '../../../shared/models/markets.model'


@Component({
	selector: 'market-detail-card',
	templateUrl: 'market-detail-card.html'
})
export class MarketDetailCard {
	activeIndex = 0
	@Input() changePercentage: number
	@Input() changeTitles: string[]
	@Input() changeData: [number, number, number, number]
	@Input() durations: { [key: string]: string }
	@Input() perGas: number
	@Input() selectedCoin: Coin
	@Output() durationsClick = new EventEmitter()

	get symbol () { return this.selectedCoin.symbol }
	get currentPrice () { return this.selectedCoin.currentPrice }
	get change () {
		const { changePercentage } = this
		if (changePercentage) {
			const changeNumber = changePercentage.toFixed(2)

			if (changePercentage > 0) return `+${changeNumber}%`
			return `${changeNumber}%`
		}
		return '-'
	}
	get isFall () { return this.changePercentage < 0 }
	get durationsTitles () { return Object.keys(this.durations).map(k => this.durations[k]) }

	handleDurationsClick (index) {
		this.activeIndex = index
		this.durationsClick.emit(index)
	}
}

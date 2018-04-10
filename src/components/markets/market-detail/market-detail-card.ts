import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output
} from '@angular/core'
import { Coin } from '../../../shared/models/markets.model'


@Component({
	selector: 'market-detail-card',
	templateUrl: 'market-detail-card.html'
})
export class MarketDetailCard implements OnInit {
	activeIndex = 0
	@Input() changeTitles
	@Input() changeData
	@Input() durations
	@Input() perGas: number
	@Input() selectedCoin: Coin
	@Output() durationsClick = new EventEmitter()

	get symbol () { return this.selectedCoin.symbol }
	get percent_change_1h () { return this.selectedCoin.percent_change_1h }
	get percent_change_7d () { return this.selectedCoin.percent_change_7d }
	get percent_change_24h () { return this.selectedCoin.percent_change_24h }
	get currentPrice () { return this.selectedCoin.currentPrice }
	get isFall () { return this.percent_change_24h && /-/.test(this.percent_change_24h) }
	get durationsTitles () { return Object.keys(this.durations).map(k => this.durations[k]) }

	constructor () { }

	ngOnInit () {

	}

	handleDurationsClick (index) {
		this.activeIndex = index
		this.durationsClick.emit(index)
	}
}

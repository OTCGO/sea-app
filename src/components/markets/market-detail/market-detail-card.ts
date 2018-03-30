import {
	Component,
	Input,
	OnInit
} from '@angular/core'

@Component({
	selector: 'market-detail-card',
	templateUrl: 'market-detail-card.html'
})
export class MarketDetailCard implements OnInit {
	@Input() changeTitles = ['开盘价', '最高价', '最低价', '成交量/K']
	@Input() changeData = [2.99, 10240.12313, 9283.798523, 1230]
	@Input() durationsTitles = ['时', '天', '周', '月']
	@Input() perGas = 32123
	@Input() selectedCoin = {
		symbol: 'ast',
		percent_change_1h: '123',
		percent_change_7d: '13',
		percent_change_24h: '-33',
		currentPrice: '123'
	}

	get symbol () {
		return this.selectedCoin.symbol
	}

	get percent_change_1h () {
		return this.selectedCoin.percent_change_1h
	}

	get percent_change_7d () {
		return this.selectedCoin.percent_change_7d
	}

	get percent_change_24h () {
		return this.selectedCoin.percent_change_24h
	}

	get currentPrice () {
		return this.selectedCoin.currentPrice
	}

	constructor () { }

	ngOnInit () { }
}
console.log('card', new MarketDetailCard())
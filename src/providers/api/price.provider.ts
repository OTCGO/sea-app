import { Injectable } from '@angular/core'
import {
	HttpClient,
} from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/distinctUntilChanged'
import { contains } from 'ramda'

/**
 * TODO: Temporary using Neon.api.cmc instead
 */
@Injectable()
export class PriceProvider {
	fixerApi = '//api.fixer.io'
	ccmApi = 'https://api.coinmarketcap.com/v1'
	ticker = 'ticker'
	prices = []

	static CURRENCIES: string[] = ['aud', 'brl', 'cad', 'chf', 'clp', 'cny', 'czk', 'dkk', 'eur', 'gbp', 'hkd', 'huf', 'idr',
	                        'ils', 'inr', 'jpy', 'krw', 'mxn', 'myr', 'nok', 'nzd', 'php', 'pkr', 'pln', 'rub', 'sek',
	                        'sgd', 'thb', 'try', 'twd', 'usd', 'zar']

	static NEO_CHAIN_COINS: string[] = ['NEO', 'GAS', 'TNC', 'QLC', 'TKY', 'RHT', 'CPX', 'ACAT', 'ZPT', 'APH', 'DBC', 'RPX', 'BCS', 'ONT', 'LRN']


	constructor (private http: HttpClient) {}

	getPrices (currency = 'cny') {
		return this.query(`${this.ccmApi}/${this.ticker}`, currency).toPromise()
	}

	getExchangeRates (base = 'USD') {
		return this.http.get(`${this.fixerApi}/latest`, {params: { base }}).toPromise()
	}

	private query (url, currency) {
		currency = currency.toLowerCase()

		if (contains<string>(currency, PriceProvider.CURRENCIES)) {
			return this.http
			           .get(url, { params: { limit: 0, convert: currency } } as any)
			           .map((res: any) => {
				           if (res.error != null) throw new Error(res.error)
				           return this.mapPrices(res, currency)
			           })
			           .distinctUntilChanged()

		} else {
			return Observable.throw(new ReferenceError(`${currency} 不在可接受的货币列表里!`))
		}
	}

	private mapPrices (tickers, currency) {
		return tickers.filter(data => contains<string>(data['symbol'], PriceProvider.NEO_CHAIN_COINS))
		              .map(
			              ticker => ({
				              symbol: ticker.symbol,
				              currentPrice: ticker[`price_${currency}`],
				              percent_change_1h: ticker['percent_change_1h'],
				              percent_change_24h: ticker['percent_change_24h'],
				              percent_change_7d: ticker['percent_change_7d'],
			              })
		              )
	}

}
import { Injectable } from '@angular/core'
import * as moment from 'moment'
import * as API_CONSTANTS from '../../../providers/api/api.consts'
import { ASSET_ENUM } from '../../../shared/constants'
import { api } from '../../../libs/neon'

import { ApiProvider } from '../../../providers'
import { AccountProvider } from '../../../providers/account/account.provider'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class PossessionDetailProvider {
	// account = this.accountProvider.defaultAccount
	prices

	constructor(
		private apiProvider: ApiProvider,
		private accountProvider: AccountProvider
	) { }

	getPrices() {
		return api.cmc.getPrices(['NEO', 'GAS', 'QLC', 'RPX', 'DBC', 'TNC'], 'cny')
	}

	getHistories(name) {

		const account = this.accountProvider.defaultAccount
		const assetId = '0x' + ASSET_ENUM[name.toUpperCase()]

		return this.apiProvider
			.get(API_CONSTANTS.HISTORY + '/' + account.address)
			.map(res => res['result'])
			.map(result => result.filter(item => item.asset === assetId))
			.map(result => result.map(item => parseTx(item)))
			.toPromise()
	}
}

function parseTx(data) {
	const [subtitle, title] = moment(data['time']).add(8, 'h').format('GGGG/MM/DD HH:mm:ss').toString().split(' ')
	return {
		...data,
		time: { subtitle, title }
	}
}

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { dev } from '../../environments/environment'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ApiProvider {
	otcgoApi = 'http://api.otcgo.cn'
	nep5Api = 'http://nep5.otcgo.cn'
	futureApi = 'http://future.otcgo.cn'

	constructor (private http: HttpClient) {}

	getAPIEndpoint () {
		return dev
			? `${this.otcgoApi}/testnet`
			: `${this.otcgoApi}/mainnet`
	}

	getScanAPI () {
		return dev
			? 'https://api.neoscan.io/api/main_net'
			: 'https://neoscan-testnet.io/api/test_net'
	}

	getNeonDBAPI () {
		return dev
			? 'http://api.wallet.cityofzion.io'
			: 'http://testnet-api.wallet.cityofzion.io'
	}

	request (method, url, options?: any) {
		return this.http.request(method, this.getAPIEndpoint() + '/' + url, options)
	}

	get (endpoint: string, options?: any): Observable<any> {
		console.log(endpoint)
		return this.http.get(this.getAPIEndpoint() + '/' + endpoint, options)
	}

	post (endpoint: string, body: any, options?: any) {
		return this.http.post(this.getAPIEndpoint() + '/' + endpoint, body, options)
	}

	broadcast (body) {
		return this.http.post(`${this.getAPIEndpoint()}/broadcast`, body)
	}

}

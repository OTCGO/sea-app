import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { dev } from '../../environments/environment'
import { Observable } from 'rxjs/Observable'
import { timeout } from 'rxjs/operators'
import 'rxjs/add/operator/timeout';


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
		return this.http
		           .request(method, this.getAPIEndpoint() + '/' + url, options)
		           .pipe(
			           timeout(10000)
		           )
		
	}

	get (endpoint: string, options?: any): Observable<any> {
		console.log(endpoint)
		return this.http
		           .get(this.getAPIEndpoint() + '/' + endpoint, options)
		           .pipe(
			           timeout(10000)
		           )
	}

	post (endpoint: string, body: any, options?: any): Observable<any> {
		return this.http
		           .post(this.getAPIEndpoint() + '/' + endpoint, body, options)
		           .pipe(
			           timeout(10000)
		           )
	}

	broadcast (body) {
		return this.http
		           .post(`${this.getAPIEndpoint()}/broadcast`, body)
		           .pipe(
			           timeout(10000)
		           )
	}

}

import { HttpClient } from '@angular/common/http'
import { Injectable, OnDestroy } from '@angular/core'

import { dev } from '@app/env'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { takeUntil, timeout } from 'rxjs/operators'


@Injectable()
export class ApiProvider implements OnDestroy {
	otcgoApiV1 = 'api.otcgo.cn'
	otcgoApiV2 = 'api.otcgo.cn'
	onDestroy = new Subject()

	constructor(private http: HttpClient) { }

	getAPIEndpoint() {
		return dev
			? `https://${this.otcgoApiV1}/mainnet`
			: `https://${this.otcgoApiV1}/mainnet`
	}

	getAPIV2Endpoint() {
		return dev
			? `https://${this.otcgoApiV1}/v2/mainnet`
			: `https://${this.otcgoApiV1}/v2/mainnet`
	}

	ngOnDestroy() {
		this.onDestroy.next()
	}

	request(method, url, options?: any) {
		return this.http.request(method, url, options)
			.pipe(
				takeUntil(this.onDestroy),
				timeout(10000)
			)

	}

	get(endpoint: string, options?: any): Observable<any> {
		console.log(endpoint)
		return this.http
			.get(this.getAPIEndpoint() + '/' + endpoint, options)
			.pipe(takeUntil(this.onDestroy), timeout(10000))
	}

	getV2(endpoint: string, options?: any): Observable<any> {
		return this.http
			.get(this.getAPIV2Endpoint() + '/' + endpoint, options)
			.pipe(takeUntil(this.onDestroy), timeout(10000))
	}

	post(endpoint: string, body: any, options?: any): Observable<any> {
		return this.http
			.post(this.getAPIEndpoint() + '/' + endpoint, body, options)
			.pipe(takeUntil(this.onDestroy), timeout(10000))
	}

	postV2(endpoint: string, body: any, options?: any): Observable<any> {
		return this.http
			.post(this.getAPIV2Endpoint() + '/' + endpoint, body, options)
			.pipe(takeUntil(this.onDestroy), timeout(10000))
	}

	broadcast(body) {
		console.log('broadcast', body)
		return this.http
			.post(`${this.getAPIEndpoint()}/broadcast`, body)
			.pipe(takeUntil(this.onDestroy), timeout(10000))
	}

	broadcastV2(body) {
		console.log('broadcast', body)
		return this.http
			.post(`${this.getAPIV2Endpoint()}`, body)
			.pipe(takeUntil(this.onDestroy), timeout(10000))
	}

	broadcastOnt(body) {
		console.log('broadcast/ont', body)
		return this.http
			.post(`${this.getAPIEndpoint()}/broadcast/ont`, body)
			.pipe(takeUntil(this.onDestroy), timeout(10000))
	}

}

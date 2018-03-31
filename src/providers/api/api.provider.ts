import { HttpClient } from '@angular/common/http'
import { Injectable, OnDestroy } from '@angular/core'

import { dev } from '../../environments/environment'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { takeUntil, timeout } from 'rxjs/operators'


@Injectable()
export class ApiProvider implements OnDestroy {
	otcgoApi = 'api.otcgo.cn'
	onDestroy = new Subject()

	constructor (private http: HttpClient) { }

	getAPIEndpoint () {
		return dev
			? `http://${this.otcgoApi}/testnet`
			: `https://${this.otcgoApi}/mainnet`
	}

	ngOnDestroy () {
		this.onDestroy.next()
	}

	request (method, url, options?: any) {
		return this.http.request(method, url, options)
							 .pipe(
								 takeUntil(this.onDestroy),
								 timeout(10000)
							 )
		
	}

	get (endpoint: string, options?: any): Observable<any> {
		console.log(endpoint)
		return this.http
		           .get(this.getAPIEndpoint() + '/' + endpoint, options)
							 .pipe(takeUntil(this.onDestroy), timeout(10000))
	}

	post (endpoint: string, body: any, options?: any): Observable<any> {
		return this.http
		           .post(this.getAPIEndpoint() + '/' + endpoint, body, options)
							 .pipe(takeUntil(this.onDestroy), timeout(10000))
	}

	broadcast (body) {
		return this.http
		           .post(`${this.getAPIEndpoint()}/broadcast`, body)
							 .pipe(takeUntil(this.onDestroy), timeout(10000))
	}

}

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { AlertController, LoadingController, ToastController } from 'ionic-angular'

import { IReqOpts } from './api.modal'
import { dev } from '../../environments/environment'

@Injectable()
export class ApiProvider {
	otcgoApi = 'http://api.otcgo.cn'

	constructor (
		private http: HttpClient,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController
	) {}

	getAPIEndpoint () {
		return dev
			? `${this.otcgoApi}:9999/testnet`
			: `${this.otcgoApi}:9999/mainnet`
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

	get (endpoint: string, options?: IReqOpts) {
		return this.http.get(this.getAPIEndpoint() + '/' + endpoint, options)
	}

	post (endpoint: string, body: any, options?: IReqOpts) {
		const headers = new HttpHeaders({ 'Content-Type': 'text/plain' })
		return this.http.post(this.getAPIEndpoint() + '/' + endpoint, body)
	}

	broadcast (body) {
		return this.http.post(`${this.getAPIEndpoint()}/broadcast`, body)
	}

}

import { Component, OnInit } from '@angular/core'
import {
	NavParams,
	IonicPage,
	NavController,
	ModalController, LoadingController,
} from 'ionic-angular'

import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'

import { BigNumber } from 'bignumber.js'

import { PossessionDetailProvider } from './possession-detail.provider'


/* TODO: This code is a mess, Try whenever refactor it MEOW */

interface TransactionHistory {
	assetId
	amount
	dest
	confirm
	txid
	name
}

@IonicPage()
@Component({
	selector: 'page-possession-detail',
	templateUrl: 'possession-detail.html',
})
export class PossessionDetailPage implements OnInit {
	possessionData
	transactionHistories: TransactionHistory[] = []
	loading = this.loadingCtrl.create()
	totalValue

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private modalCtrl: ModalController,
		private loadingCtrl: LoadingController,
	  private possessionDetailProvider: PossessionDetailProvider
	) {}

	ngOnInit() {
		this.loading.present()
		this.possessionData = this.navParams.data
		this.possessionData.amount = new BigNumber(this.possessionData.amount)

		this.possessionDetailProvider
		    .getPrices()
		    .then(prices => {
		    	const price = prices[this.possessionData.symbol]
			    // const conversion = 6.5
			    this.totalValue = this.possessionData.amount.times(price)
		    })
		    .then(_=> {
			    this.possessionDetailProvider
			        .getHistories(this.possessionData.symbol)
			        .then(histories => {
				        this.transactionHistories = histories
			        })
		    })
		    .catch(error => {
			    console.error('Possession detail', error)
		    })
		    .then(_=> this.loading.dismissAll())
	}

	showSendModal () {
		const sendModal = this.modalCtrl.create(
			'SendModalComponent',
			this.possessionData,
			{ cssClass: 'inset-modal' }
		)
		sendModal.present()
	}
}

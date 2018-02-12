import { Component, OnInit } from '@angular/core'
import {
	NavParams,
	IonicPage,
	NavController,
	ModalController, LoadingController,
} from 'ionic-angular'

import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'

import bn from 'bignumber.js'

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
	tokenCurrentPrice
	transactionHistories: TransactionHistory[] = []
	loading = this.loadingCtrl.create()

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
		this.possessionData.amount = new bn(this.possessionData.amount)
		console.log(this.possessionData)
		this.initData()
	}

	initData () {
		this.possessionDetailProvider
		    .getHistories(this.possessionData.asset)
		    .then(histories => {
			    this.transactionHistories = histories
			    this.loading.dismissAll()
		    })
		    .catch(error => {
		    	this.loading.dismissAll()
			    console.error('Possession history', error)
		    })
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

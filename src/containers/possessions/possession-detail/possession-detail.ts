import { Component, OnInit } from '@angular/core'
import {
	NavParams,
	IonicPage,
	NavController,
	ModalController, LoadingController,
} from 'ionic-angular'

import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'

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
		this.initData()
	}

	initData () {
		this.possessionDetailProvider.getHistories(this.possessionData.asset).then(histories => {
			this.transactionHistories = histories
			this.loading.dismissAll()
		})
	}

	ionViewDidLoad () {

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

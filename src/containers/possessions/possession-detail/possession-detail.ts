import { Component, OnInit } from '@angular/core'
import {
	NavParams,
	IonicPage,
	NavController,
	ModalController,
	LoadingController,
} from 'ionic-angular'

import { PossessionDetailProvider } from './possession-detail.provider'

interface TransactionHistory {
	assetId
	amount
	dest
	confirm
	txid
	name
}

@IonicPage({
	name: 'PossessionDetail'
})
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
    console.log('detail entered')

		this.possessionDetailProvider
		    .getPrices()
		    .then(prices => {
		    	const price = prices[this.possessionData.symbol]
			    this.totalValue = this.possessionData.amount.times(price)
		    })
		    .catch(error => {
			    console.error('Possession detail', error)
			    this.totalValue = NaN
		    })
		    .then(_=> {
			    this.possessionDetailProvider
			        .getHistories(this.possessionData.symbol)
			        .then(histories => {
				        this.transactionHistories = histories
			        })
		    })
		    .then(_=> this.loading.dismissAll())
	}

	showSendModal () {
		const possessionData = {
			hash: this.possessionData.hash,
			symbol: this.possessionData.symbol,
			amount: this.possessionData.amount.toNumber()
		}

		const sendModal = this.modalCtrl.create(
			'SendModal',
			possessionData,
			{ cssClass: 'inset-modal' }
		)
		sendModal.present()
	}
}

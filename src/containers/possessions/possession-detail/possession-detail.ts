import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
	NavParams,
	IonicPage,
	NavController,
	ModalController,
	LoadingController,
} from 'ionic-angular'
import { RootState } from '../../../store/reducers'
import * as PricesSelectors from '../../../store/selectors/prices.selector'

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
export class PossessionDetailPage {
	possessionData
	transactionHistories: TransactionHistory[] = []
	loading
	totalValue

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private modalCtrl: ModalController,
		private loadingCtrl: LoadingController,
	  private possessionDetailProvider: PossessionDetailProvider,
		private store: Store<RootState>
	) {}

	ngOnInit () {
		this.loading = this.loadingCtrl.create()
		this.loading.present()
		this.possessionData = this.navParams.data

		this.store
				.select(PricesSelectors.getEntities)
				.subscribe(prices => this.totalValue = this.possessionData.amount.times(prices[this.possessionData.symbol]))
		this.possessionDetailProvider
				.getHistories(this.possessionData.symbol)
				.then(histories => {
					this.transactionHistories = histories
				})
				.then(_=> this.loading.dismiss())
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

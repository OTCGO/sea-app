import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'

import { WalletProvider } from '../../../../../providers/wallet/wallet.provider'

@IonicPage()
@Component({
	selector: 'page-import-file',
	templateUrl: 'import-file.html',

})
export class ImportFilePage {
	private _file: File
	importText: string = '导入钱包文件'
	isWIFKey: boolean = false
	WIFKey: string
	passphrase: string

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private walletProvider: WalletProvider,
		public alertCtrl: AlertController
	) {}

	openImportBox () {
		this.isWIFKey = false
		this.importText = '导入钱包文件'

		this.openWallet()
	}

	openWIFKeyBox () {
		this.isWIFKey = true
		this.importText = '导入'
	}

	openWallet () {
		if (window.navigator && !this.WIFKey) {
			let fileInput = document.querySelector(
				'page-login input[type=file]#fileInput') as HTMLInputElement
			fileInput.click()
		}
	}

	fileChange (file) {
		if (file) {
			this.importText = file.name.slice()
			const reader = new FileReader()
			const ng = this

			reader.onload = function () {
				try {
					const JSONFile = JSON.parse(this.result)
					if (ng.walletProvider.isOldWallet(JSONFile)) {
						return ng.walletProvider.upgradeAndAddToAccount(JSONFile, ng.passphrase)
					}
					ng._file = JSONFile
				} catch (e) {
					console.log(e)
				}
			}

			reader.readAsText(file)
		}
	}

	doImport () {

	}
}

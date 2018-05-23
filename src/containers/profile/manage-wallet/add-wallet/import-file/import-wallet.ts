import { Component } from '@angular/core'
import {
	IonicPage,
	NavController,
	NavParams,
	AlertController
} from 'ionic-angular'

@IonicPage({ name: 'ImportWallet' })
@Component({
	selector: 'page-import-wallet',
	templateUrl: 'import-wallet.html'
})
export class ImportWallet {
	prefix = 'PROFILE.MANAGE_WALLET.IMPORT_WALLET.'

	constructor (private navCtrl: NavController) {

	}

	importWIF (wifValue) {
		console.log('via wif', wifValue)
	}

	importNEP5 (file) {
		console.log('via file', file)
	}

	importOldWallet ({ oldWallet, passphrase }) {
		console.log('via old w', oldWallet, passphrase)
	}
}

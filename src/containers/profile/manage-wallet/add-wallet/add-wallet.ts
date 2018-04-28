import { Component } from '@angular/core'
import {
	IonicPage,
	NavController
} from 'ionic-angular'


@IonicPage({
	name: 'AddWallet'
})
@Component({
	selector: 'page-add-wallet',
	templateUrl: 'add-wallet.html',
})
export class AddWalletPage {
	translationPrefix = 'PROFILE.MANAGE_WALLET.ADD_WALLET.'

	constructor (private navCtrl: NavController) {}
}

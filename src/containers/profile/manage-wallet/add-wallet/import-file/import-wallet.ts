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

}

import { Component } from '@angular/core'
import {
	IonicPage,
	NavController,
	NavParams
} from 'ionic-angular'
import { CreateWalletPage } from '../../../create-wallet/create-wallet'

import { ImportFilePage } from './import-file/import-file'
import { ImportPrivateKeyPage } from './import-private-key/import-private-key'
import { ObservationModePage } from './observation-mode/observation-mode'


@IonicPage({
	name: 'AddWallet'
})
@Component({
	selector: 'page-add-wallet',
	templateUrl: 'add-wallet.html',
})
export class AddWalletPage {

}

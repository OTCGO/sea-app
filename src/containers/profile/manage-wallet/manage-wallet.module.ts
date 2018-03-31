import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'
import {
	ManageWalletCard,
	ManageWalletCards
} from '../../../components/profile/manage-wallet'
import { ManageWalletPage } from './manage-wallet'


@NgModule({
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(ManageWalletPage)
	],
	exports: [
		ManageWalletPage
	],
	declarations: [
		ManageWalletPage,
		ManageWalletCards,
		ManageWalletCard
	]
})
export class ManageWalletPageModule { }

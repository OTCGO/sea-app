import { NgModule } from '@angular/core'
import { ManageWalletPage } from './manage-wallet'
import { IonicPageModule } from 'ionic-angular'
import { SlideCardModule } from '../../../components'

@NgModule({
	imports: [
		IonicPageModule.forChild(ManageWalletPage),
	  SlideCardModule
	],
	exports: [
		ManageWalletPage
	],
	declarations: [ManageWalletPage]
})
export class ManageWalletPageModule { }

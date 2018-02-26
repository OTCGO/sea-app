import { NgModule } from '@angular/core'
import { ManageWalletPage } from './manage-wallet'
import { IonicPageModule } from 'ionic-angular'
import { SlideCardModule } from '../../../components'
import { TranslateModule } from '@ngx-translate/core'

@NgModule({
	imports: [
		SlideCardModule,
		TranslateModule.forChild(),
		IonicPageModule.forChild(ManageWalletPage)
	],
	exports: [
		ManageWalletPage
	],
	declarations: [ManageWalletPage]
})
export class ManageWalletPageModule { }

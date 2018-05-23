import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { AddWalletPage } from './add-wallet'

@NgModule({
	declarations: [AddWalletPage],
	imports: [
		IonicPageModule.forChild(AddWalletPage),
		TranslateModule.forChild()
	],
	exports: [AddWalletPage]
})
export class AddWalletPageModule {}

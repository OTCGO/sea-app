import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { AddWalletPage } from './add-wallet'

@NgModule({
	declarations: [AddWalletPage],
	imports: [IonicPageModule.forChild(AddWalletPage)],
	exports: [AddWalletPage]
})
export class AddWalletPageModule {}

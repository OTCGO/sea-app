import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { ImportWallet } from './import-wallet'

@NgModule({
	declarations: [ImportWallet],
	imports: [
		IonicPageModule.forChild(ImportWallet),
		TranslateModule.forChild()
	]
})
export class ImportWalletModule {}

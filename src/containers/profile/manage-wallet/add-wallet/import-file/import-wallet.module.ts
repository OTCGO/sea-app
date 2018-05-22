import { NgModule } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { IonicPageModule } from 'ionic-angular'
import { ImportWallet } from './import-wallet'
import { LoginFormModule } from '../../../../../components/login'


@NgModule({
	declarations: [
		ImportWallet,
	],
	imports: [
		LoginFormModule,
		IonicPageModule.forChild(ImportWallet),
		TranslateModule.forChild()
	]
})
export class ImportWalletModule {}

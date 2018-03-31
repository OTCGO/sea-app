import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { CreateWalletPage } from './create-wallet'
import { TranslateModule } from '@ngx-translate/core'

const COMPONENTS = [
	CreateWalletPage
]

@NgModule({
	declarations: COMPONENTS,
	imports: [
		TranslateModule.forChild(),
		IonicPageModule.forChild(CreateWalletPage),
	],
	exports: COMPONENTS
})
export class CreateWalletPageModule {}

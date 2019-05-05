import { NgModule } from '@angular/core'
import { RechargePage } from './recharge'
import { IonicPageModule } from 'ionic-angular'
import { TranslateModule } from '@ngx-translate/core'


const COMPONENT = [
	RechargePage
]

@NgModule({
	declarations: COMPONENT,
	imports: [
		IonicPageModule.forChild(RechargePage),
		TranslateModule.forChild()
	],
	exports: COMPONENT,
})
export class RechargePageModule {}

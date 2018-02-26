import { NgModule } from '@angular/core'
import { PossessionsPage } from './possessions'
import { IonicPageModule } from 'ionic-angular'
import { PipesModule } from '../../pipes/pipes.module'
import { TranslateModule } from '@ngx-translate/core'


@NgModule({
	declarations: [
		PossessionsPage
	],
	imports: [
		PipesModule,
		TranslateModule.forChild(),
		IonicPageModule.forChild(PossessionsPage)
	],
	exports: [
		PossessionsPage
	]
})
export class PossessionsPageModule {}

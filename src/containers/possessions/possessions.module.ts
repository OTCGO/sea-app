import { NgModule } from '@angular/core'
import { PossessionsPage } from './possessions'
import { IonicPageModule } from 'ionic-angular'
import { PipesModule } from '../../pipes/pipes.module'


@NgModule({
	declarations: [
		PossessionsPage
	],
	imports: [
		IonicPageModule.forChild(PossessionsPage),
		PipesModule
	],
	exports: [
		PossessionsPage
	]
})
export class PossessionsPageModule {}

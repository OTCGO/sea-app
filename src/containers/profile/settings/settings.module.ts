import { NgModule } from '@angular/core'
import { SettingsPage } from './settings';
import { IonicPageModule } from 'ionic-angular'
import { ExpansionModule } from '../../../components/expansion-panel/expansion-module'
import { TranslateModule } from '@ngx-translate/core'

const COMPONENT = [SettingsPage]

@NgModule({
	declarations: COMPONENT,
	imports: [
		IonicPageModule.forChild(SettingsPage),
		TranslateModule.forChild(),
		ExpansionModule
	],
	exports: COMPONENT,
})
export class SettingsPageModule {}

import { NgModule } from '@angular/core'
import { SettingsPage } from './settings'
import { IonicPageModule } from 'ionic-angular'
import { ExpansionModule } from '../../../components/expansion-panel/expansion-module'
import { TranslateModule } from '@ngx-translate/core'
import {
	SettingsCurrencies,
	SettingsLanguage
} from '../../../components/profile/settings'

const COMPONENT = [
	SettingsPage,
	SettingsLanguage,
	SettingsCurrencies
]

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

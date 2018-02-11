import { NgModule } from '@angular/core'
import { SettingsPage } from './settings';
import { IonicPageModule } from 'ionic-angular'
import { ExpansionModule } from '../../../components/expansion-panel/expansion-module'

const COMPONENT = [SettingsPage]

@NgModule({
	declarations: COMPONENT,
	imports: [
		IonicPageModule.forChild(SettingsPage),
	  ExpansionModule
	],
	exports: COMPONENT,
})
export class SettingsPageModule {}

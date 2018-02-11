import { Component } from '@angular/core'
import { IonicPage } from 'ionic-angular'


@IonicPage({
	name: 'Settings',
	segment: 'settings'
})
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html'
})
export class SettingsPage {
	constructor () { }
}
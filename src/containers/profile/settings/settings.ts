import { Component } from '@angular/core'
import { IonicPage } from 'ionic-angular'
import { TranslateService } from '@ngx-translate/core'


@IonicPage({
	name: 'settings'
})
@Component({
	selector: 'page-settings',
	templateUrl: 'settings.html'
})
export class SettingsPage {
	constructor (public translateService: TranslateService) {}

	setLocale (locale) {
		/*this.translateService.getTranslation(locale).subscribe(debug('getTranslation'))
		this.translateService.use(locale).subscribe(debug('use'))
		this.translateService.reloadLang(locale).subscribe(debug('reloadLang'))
		console.log(locale)*/
	}
}

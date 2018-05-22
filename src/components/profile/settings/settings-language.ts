import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output
} from '@angular/core'

@Component({
	selector: 'settings-language',
	templateUrl: 'settings-language.html'
})
export class SettingsLanguage {
	@Input() languages
  @Input() currentLanguage: string
	@Output() localeClick = new EventEmitter()

  translationPrefix = 'PROFILE.SETTINGS.LANGUAGES.'

  get selectedLanguage () {
	  return this.languages && this.languages.find(lang => this.currentLanguage.includes(lang.locale)).title
  }
}

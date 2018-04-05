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
export class SettingsLanguage implements OnInit {
	@Input() languages
	@Output() localeClick = new EventEmitter()

	ngOnInit () { }

	handleClick (locale) {
		this.localeClick.emit(locale)
	}
}

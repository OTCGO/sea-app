import { Component, EventEmitter, Input, Output } from '@angular/core'


@Component({
	selector: 'settings-currencies',
	templateUrl: 'settings-currencies.html'
})
export class SettingsCurrencies {
  @Input() currencies: string[]
  @Input() currentCurrency: string
  @Output() currencyClick = new EventEmitter()

  translationPrefix = 'PROFILE.SETTINGS.CURRENCIES.'
}

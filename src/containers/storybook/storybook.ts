import { Component } from '@angular/core'
import { IonicPage } from 'ionic-angular'

@IonicPage({
	name: 'Storybook',
	segment: 'storybook'
})
@Component({
	selector: 'page-storybook',
	template: `
		<manage-wallet-play></manage-wallet-play>
	`
})
export class Storybook {

}
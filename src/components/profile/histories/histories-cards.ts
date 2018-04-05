import {
	Component,
	Input
} from '@angular/core'
import {
	compose,
	head,
	split,
	last
} from 'ramda'


@Component({
	selector: 'histories-cards',
	templateUrl: 'histories-cards.html'
})
export class HistoriesCards {
	@Input() histories

	constructor () { }

	ngOnInit () {
		console.log(this)
	}

	translationPrefix = 'POSSESSIONS.DETAILS.'
	splitBySpace = split(' ')

	getDate (time: string) {
		return compose<string, string[], string>(
			head,
			this.splitBySpace
		)(time)
	}

	getTime (time: string) {
		return compose<string, string[], string>(
			last,
			this.splitBySpace
		)(time)
	}
}
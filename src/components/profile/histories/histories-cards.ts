import {
	Component,
	EventEmitter,
	Input,
	Output
} from '@angular/core'
import {
	compose,
	head,
	split,
	last
} from 'ramda'
import { TransactionHistory } from '../../../shared/models'


@Component({
	selector: 'histories-cards',
	templateUrl: 'histories-cards.html'
})
export class HistoriesCards {
	@Input() histories: TransactionHistory[]
	@Output() select = new EventEmitter()

	constructor () { }

	ngOnInit () {

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
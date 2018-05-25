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
	last,
	prop,
	nth
} from 'ramda'
import { TransactionHistory } from '../../../shared/models'
import * as moment from 'moment'

@Component({
	selector: 'histories-cards',
	templateUrl: 'histories-cards.html'
})
export class HistoriesCards {
	@Input() histories: TransactionHistory[]
	@Output() select = new EventEmitter()

	translationPrefix = 'POSSESSIONS.DETAILS.'
	splitBySpace = split(' ')

	getDate = compose<string, string[], string>(head, this.splitBySpace)
	getTime = compose<string, string[], string>(last, this.splitBySpace)

	computeNumber (value: string) {
		return prop('length')(nth(1)(split('.', value))) > 4
			? Number(value).toFixed(4)
			: value
	}
}

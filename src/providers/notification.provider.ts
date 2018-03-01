import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class NotificationProvider {
	subject = new Subject()
	notification$ = this.subject.asObservable()

	constructor () {

	}

	emit (text) {
		this.subject.next(text)
	}
}
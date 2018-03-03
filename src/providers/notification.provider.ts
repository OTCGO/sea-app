import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { ToastOptions } from 'ionic-angular'

@Injectable()
export class NotificationProvider {
	subject = new Subject()
	notification$ = this.subject.asObservable()

	emit (opts: ToastOptions) {
		this.subject.next(opts)
	}
}

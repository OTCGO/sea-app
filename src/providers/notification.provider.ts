import { Injectable } from '@angular/core'
import { ToastController } from 'ionic-angular'
import { Subject } from 'rxjs/Subject'
import { notificationOpts } from '../app/app.component'

@Injectable()
export class NotificationProvider {
	subject = new Subject()
	notification$ = this.subject.asObservable()

	constructor (private toastCtrl: ToastController) {
		this.subscribeNotification()
	}

	emit (opts: notificationOpts) {
		this.subject.next(opts)
	}

	subscribeNotification () {
		this.notification$.subscribe((opts: notificationOpts) => this.showNotification(opts))
	}

	showNotification (opts: notificationOpts) {
		const toastOptions = Object.assign(opts, {
			message: opts.message['message'] || opts.message,
			position: 'bottom',
			duration: 3000
		})
		
		const toast = this.toastCtrl.create(toastOptions)
		
		return toast.present()
	}
}

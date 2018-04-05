import { Injectable } from '@angular/core'
import { ToastController } from 'ionic-angular'
import { Subject } from 'rxjs/Subject'


export interface notificationOpts {
	message: string | Error,
	position?: string,
	duration?: number
}


@Injectable()
export class NotificationProvider {
	subject = new Subject()
	notification$ = this.subject.asObservable()

	constructor (private toastCtrl: ToastController) {
		this.subscribeNotification()
	}

	emit (options: notificationOpts | string) {
		const nomi = typeof options === 'object' ? options : { message: options }
		this.subject.next(nomi)
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

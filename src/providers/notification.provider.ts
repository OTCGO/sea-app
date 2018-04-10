import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { ToastController } from 'ionic-angular'
import {
	debounceTime,
	take
} from 'rxjs/operators'
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
	debounce = 3000

	constructor (private toastCtrl: ToastController, private translateService: TranslateService) {
		this.subscribeNotification()
	}

	emit (options: notificationOpts | string) {
		const nomi = typeof options === 'object' ? options : { message: options }
		this.subject.next(nomi)
	}

	notifyTranslation (key: string, interpolateParams?: object) {
		this.translateService.get(key, interpolateParams)
				.pipe(
					take(1),
					debounceTime(this.debounce),
				)
			.subscribe(translation => this.emit(translation))
	}

	subscribeNotification () {
		this.notification$.subscribe((opts: notificationOpts) => this.showNotification(opts))
	}

	showNotification (opts: notificationOpts) {
		const toastOptions = Object.assign(opts, {
			message: opts.message['message'] || opts.message,
			position: 'bottom',
			duration: this.debounce
		})

		const toast = this.toastCtrl.create(toastOptions)

		return toast.present()
	}
}

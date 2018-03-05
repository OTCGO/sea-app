import { Injectable, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Loading, LoadingController } from 'ionic-angular'

@Injectable()
export class LoadingProvider implements OnDestroy {
	subject = new Subject()
	onDestroy = new Subject()
	loading$ = this.subject.asObservable().takeUntil(this.onDestroy)

	constructor (private loadingCtrl: LoadingController) {
		this.subscribeLoading()
	}

	loading: Loading

	subscribeLoading () {
		this.loading$
				.distinctUntilChanged()
				.subscribe(
					bool => {
						if (bool) {
							this.loading = this.loadingCtrl.create()
							return this.loading.present()
						}
						return this.loading.dismissAll()
					}
				)
	}

	emit (bool: boolean) {
		this.subject.next(bool)
	}

	ngOnDestroy () {
		this.onDestroy.next()
	}
}

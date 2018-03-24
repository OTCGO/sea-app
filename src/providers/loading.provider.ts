import { Injectable, OnDestroy } from '@angular/core'
import { of } from 'rxjs/observable/of'
import { Subject } from 'rxjs/Subject'
import { Loading, LoadingController } from 'ionic-angular'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/catch'


@Injectable()
export class LoadingProvider implements OnDestroy {
	subject = new Subject()
	onDestroy = new Subject()
	loading$ = this.subject.asObservable().takeUntil(this.onDestroy)

	constructor (private loadingCtrl: LoadingController) {
		this.loading$
				.distinctUntilChanged()
				.timeout(1234)
				.catch(_ => of(false))
				.subscribe(
					bool => {
						console.log('Loading:', bool)
						if (bool) {
							this.loading = this.loadingCtrl.create()
							return this.loading.present()
						}
						return this.loading && this.loading.dismissAll()
					}
				)
	}

	loading: Loading

	emit (bool: boolean) {
		this.subject.next(bool)
	}

	ngOnDestroy () {
		this.onDestroy.next()
	}
}

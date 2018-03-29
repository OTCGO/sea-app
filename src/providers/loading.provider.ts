import { Injectable, OnDestroy } from '@angular/core'
import { of } from 'rxjs/observable/of'
import { Subject } from 'rxjs/Subject'
import { Loading, LoadingController } from 'ionic-angular'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/catch'


@Injectable()
export class LoadingProvider implements OnDestroy {
	loading: Loading
	subject = new Subject()
	onDestroy = new Subject()
	loading$ = this.subject.asObservable().takeUntil(this.onDestroy)

	constructor (private loadingCtrl: LoadingController) {
		this.loading$
				.distinctUntilChanged()
				.timeout(3456)
				.catch(() => of(false))
				.subscribe(
					bool => {
						console.log('Call loading:', bool)
						if (bool) {
							this.loading = this.loadingCtrl.create()
							return this.loading.present()
						}
						return this.loading && this.loading.dismissAll()
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

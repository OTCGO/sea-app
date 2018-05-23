import { Injectable, OnDestroy } from '@angular/core'
import { of } from 'rxjs/observable/of'
import { Subject } from 'rxjs/Subject'
import { Loading, LoadingController } from 'ionic-angular'
import 'rxjs/add/operator/takeUntil'
import 'rxjs/add/operator/timeout'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/publish'


@Injectable()
export class LoadingProvider {
	loading: Loading
	subject = new Subject()
	loading$ = this.subject.publish().refCount()

	constructor (private loadingCtrl: LoadingController) {
		this.loading$
				.distinctUntilChanged()
				// .timeout(0)
				.catch(() => of(false))
				.subscribe(
					(boolOrOptions) => {
						try {
							if (boolOrOptions) {
								this.loading = this.loadingCtrl.create()
								return this.loading.present()
							}

							if (this.loading) {
								this.loading.dismiss().catch(() => {}).catch(() => {})
							}
						} catch (error) {
							this.loading.dismiss().catch(() => {}).catch(() => {})
						}


						// if (this.loading) {

						// }
					}
				)
	}


	emit (bool: boolean) { this.subject.next(bool) }
}

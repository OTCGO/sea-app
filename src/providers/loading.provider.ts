import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { LoadingOptions } from 'ionic-angular'


@Injectable()
export class LoadingProvider {
	subject = new Subject()
	loading$ = this.subject.asObservable()

	emit(opts: LoadingOptions) {
		this.subject.next(opts)
	}
}

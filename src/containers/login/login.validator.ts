
import { FormControl, ValidationErrors } from '@angular/forms'
import { Observable } from 'rxjs/Observable'
import { debounceTime, map } from 'rxjs/operators'
import { isWIF } from '../../shared/utils'


export function wifValidator (wifCtrl: FormControl): Observable<ValidationErrors | null> {
	return Observable.create(obs =>
		wifCtrl
		.valueChanges
		.pipe(
			debounceTime(400),
			map(value => value.trim()),
			map(value => {
				if (value && isWIF(value)) {
					return null
				}
				throw new Error ('invalidWIF')
			})
		)
		.subscribe(
			_=> obs.next(null),
			error => {
				obs.next({ [error.message]: true })
				obs.complete()
			}
		)
	)
}

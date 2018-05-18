
import { FormControl, ValidationErrors } from '@angular/forms'
import { isWIF, isNEP2 } from '../../shared/utils'
import { debounceTime, map } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'


const invalidWIFKey = 'invalidWIF'
const invalidNEP2Key = 'invalidNEP2'

const WIFValidator = validatorBuilder(isWIF, invalidWIFKey)
const asyncWIFValidator = asyncValidatorBuilder(isWIF, invalidWIFKey)

const NEP2Validator = validatorBuilder(isNEP2, invalidNEP2Key)
const asyncNEP2Validator = asyncValidatorBuilder(isNEP2, invalidNEP2Key)

export function keyValidator (keyCtrl: FormControl) {
  const { value } = keyCtrl
  return value.length <= 52
    ? WIFValidator(keyCtrl)
    : NEP2Validator(keyCtrl)
}

export function asyncKeyValidator (keyCtrl: FormControl) {
  const { value } = keyCtrl
  return value.length <= 52
    ? asyncWIFValidator(keyCtrl)
    : asyncNEP2Validator(keyCtrl)
}

function validatorBuilder (predicate, errorKey) {
  return (ctrl: FormControl) => predicate(ctrl.value) ? null : { [errorKey]: true }
}

function asyncValidatorBuilder (
  predicate: (...x: any[]) => boolean,
  errorKey: string,
  dueTime = 250
): (ctrl: FormControl) => Observable<ValidationErrors | null> {
  return (ctrl: FormControl) => Observable.create(
    obs => ctrl.valueChanges.pipe(
      debounceTime(dueTime),
      map(value => value.trim()),
      map(value => {
        if (value && predicate(value)) return null
        throw new Error(errorKey)
      })
    ).subscribe(
      () => obs.next(null),
      error => {
        obs.next({ [error.message]: true })
        obs.complete()
      }
    )
  )
}

import { FormControl, ValidationErrors } from '@angular/forms'
import { isAddress } from '../../../shared/utils'

export function addressValidator (addressCtrl: FormControl): ValidationErrors {
	const { value } = addressCtrl
	return (!value || !isAddress(value))
		? { invalidAddress: true }
		: null
}

export function amountValidator (maxValue) {
	return (amountCtrl: FormControl): ValidationErrors | null => {
		const value = amountCtrl.value
		const reg = /^[1-9]\d*$/
		console.log('amountValidator', reg.test(value))
		if (!value || Number(value) <= 0 || Number(value) > maxValue || !reg.test(value)) {
			return { invalidAmount: true }
		}
		return null
	}
}



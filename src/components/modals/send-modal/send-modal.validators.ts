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
		if (!value || Number(value) <= 0 || Number(value) > maxValue) {
			return { invalidAmount: true }
		}
		return null
	}
}

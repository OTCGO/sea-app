import { FormControl, ValidationErrors } from '@angular/forms'
import { isAddress } from '../../../shared/utils'

export function addressValidator (addressCtrl: FormControl): ValidationErrors {
	const { value } = addressCtrl

	if ( value ) {
		if (isAddress(value) || /.neo/i.test(value)) {
			console.log('addressValidator1')
			return null
		}
	}

	console.log('addressValidator2')
	return { invalidAddress: true }
	// console.log('addressValidator', (!value || !isAddress(value) || !/.neo/i.test(value)))
	// if ( !value || !isAddress(value) || !/.neo/i.test(value)) {
	//
	// }

	// if ( !value || !/.neo/i.test(value)) {
	// 	return { invalidAddress: true }
	// }



}

export function amountValidator (maxValue) {

	return (amountCtrl: FormControl): ValidationErrors | null => {
		const value = amountCtrl.value
		console.log('amountValidator,maxValue', maxValue)
		console.log('amountValidator,value', value)
		if (!value || Number(value) <= 0 || Number(value) > maxValue) {
			return { invalidAmount: true }
		}
		return null
	}
}

export function amountInt (hash) {
	return (amountCtrl: FormControl): ValidationErrors | null => {
		 const value = amountCtrl.value
		if (hash === 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b') {
			const reg = /^[1-9]\d*$/
			if (!reg.test(value)) {
				return { invalidAmount: true }
			}
		}
		return null
	}
}


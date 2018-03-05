import { ErrorHandler, Injectable } from '@angular/core'
import { dev } from '../environments/environment'

@Injectable()
export class Logger {

	constructor (private errorHandler: ErrorHandler) { }

	log (value, ...rest) {
		if (dev) { console.log(value,  ...rest) }
	}

	error (value, ...rest) {
		const message = [value, ...rest].join(' ')
		this.errorHandler.handleError(message)
	}

	warn (value, ...rest) {
		console.warn(value, ...rest)
	}
}

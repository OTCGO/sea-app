import { Injectable } from '@angular/core'
import { File } from '@ionic-native/file'
import { Platform } from 'ionic-angular'
import { fromPromise } from 'rxjs/observable/fromPromise'
import 'rxjs/add/operator/catch'


@Injectable()
export class StorageProvider {

	dataDirectory: string = this.platform.is('android')
		? this.file.dataDirectory
		: this.file.applicationDirectory

	constructor (private file: File, private platform: Platform) {}

	read (fileName) {
		return fromPromise(
			this.file.readAsText(
				this.dataDirectory, fileName
			)
		)
	}

	save () {

	}
}

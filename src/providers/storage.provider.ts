import { Injectable } from '@angular/core'
import { File } from '@ionic-native/file'
import { Platform } from 'ionic-angular'
import { fromPromise } from 'rxjs/observable/fromPromise'
import 'rxjs/add/operator/catch'


@Injectable()
export class StorageProvider {

	private storageDirectory: string = this.platform.is('android')
		? this.file.dataDirectory
		: this.file.applicationDirectory

	constructor (private file: File, private platform: Platform) {}

	read (fileName) {
		return fromPromise(
			this.file.readAsText(
				this.storageDirectory, fileName
			)
		)
	}

	save (fileName, text) {
		return fromPromise(
			this.file
			    .checkFile(this.storageDirectory, fileName)
			    .then(
			    	bool => bool
					    ? this.file.writeExistingFile(this.storageDirectory, fileName, text)
					    : this.file.writeFile(this.storageDirectory, fileName, text)
			    )
		)
	}


}

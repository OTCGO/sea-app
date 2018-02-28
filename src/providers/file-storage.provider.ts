import { Injectable } from '@angular/core'
import { File } from '@ionic-native/file'
import { Platform } from 'ionic-angular'

@Injectable()
export class FileStorageProvider {

	private storageDirectory: string = this.platform.is('android')
		? this.file.dataDirectory
		: this.file.applicationDirectory

	constructor (private file: File, private platform: Platform) {}

	read (fileName) {
		return this.file.readAsText(
			this.storageDirectory, fileName
		)
	}

	save (fileName, text) {
		return this.file
		           .checkFile(this.storageDirectory, fileName)
		           .then(
			           bool => bool
				           ? this.file.writeExistingFile(this.storageDirectory, fileName, text)
				           : this.file.writeFile(this.storageDirectory, fileName, text)
		           )

	}

	checkFile (fileName) {
		return this.file.checkFile(this.storageDirectory, fileName)
	}

}

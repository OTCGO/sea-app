import { Injectable } from '@angular/core'
import { File } from '@ionic-native/file'
import { Platform } from 'ionic-angular'

@Injectable()
export class FileStorageProvider {

	private storageDirectory: string

	constructor (private file: File, private platform: Platform) {
		this.storageDirectory = this.platform.is('android')
			? this.file.dataDirectory
			: this.platform.is('ios')
				? this.file.applicationDirectory
				: ''
	}

	read (fileName) {
		return this.file.readAsText(
			this.storageDirectory, fileName
		)
	}

	async save (fileName, text) {
		const fileExits = await this.file
																.checkFile(this.storageDirectory, fileName)
																.then(_ => this.file.writeExistingFile(this.storageDirectory, fileName, text))
																.catch(_ => this.file.writeFile(this.storageDirectory, fileName, text))
	}

	async checkFile (fileName) {
		try {
			console.log('No error on check file')
			return await this.file.checkFile(this.storageDirectory, fileName)
		} catch (e) {
			console.log('Error on check file', e)
			return Promise.resolve(false)
		}
	}

}

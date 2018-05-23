import { Injectable } from '@angular/core'
import { File } from '@ionic-native/file'
import { Platform } from 'ionic-angular'

@Injectable()
export class FileStorageProvider {

	androidExternalDirectory = this.file.externalApplicationStorageDirectory
	androidDataDirectory = this.file.dataDirectory
	iosApplicationDirectory = this.file.applicationDirectory

	private storageDirectory: string

	constructor (private file: File, private platform: Platform) {
	  this.init()
	}

	async init () {
	  await this.platform.ready()
		this.storageDirectory = this.platform.is('android')
			? this.androidDataDirectory
			: this.platform.is('ios')
				? this.iosApplicationDirectory
				: ''
		console.log()
		console.log('platform ready:', this.storageDirectory)
		console.log()
  }

	async read (fileName) {
		await this.platform.ready()
		return await this.file.readAsText(this.storageDirectory, fileName)
	}

	async save (fileName, text) {
		try {
			const fileExits = await this.checkFile(fileName)
			await this.platform.ready()
			if (fileExits)
				return await this.file.writeExistingFile(this.storageDirectory, fileName, text)
			return await this.file.writeFile(this.storageDirectory, fileName, text)
		} catch (e) {
			console.log('Error on File Storage save()', e)
		}
	}

	async checkFile (fileName) {
		try {
			await this.platform.ready()
			return await this.file.checkFile(this.storageDirectory, fileName)
		} catch (e) {
			console.log('Error on check file', e.message)
			return Promise.resolve(false)
		}
	}
}

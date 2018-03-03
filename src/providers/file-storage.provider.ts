import { Injectable } from '@angular/core'
import { File } from '@ionic-native/file'
import { Platform } from 'ionic-angular'

@Injectable()
export class FileStorageProvider {

	private storageDirectory: string

	constructor (private file: File, private platform: Platform) {
	  this.init()
	}

	init () {
	  this.platform.ready().then(_ => {
      this.storageDirectory = this.platform.is('android')
        ? this.file.dataDirectory
        : this.platform.is('ios')
          ? this.file.applicationDirectory
          : ''
    })
  }

	read (fileName) {
		return this.file.readAsText(
			this.storageDirectory, fileName
		)
	}

	async save (fileName, text) {
		const fileExits = await this.file.checkFile(this.storageDirectory, fileName)
    if (fileExits) {
      return this.file.writeExistingFile(this.storageDirectory, fileName, text)
    }
    return this.file.writeFile(this.storageDirectory, fileName, text)
	}

	async checkFile (fileName) {
		try {
			console.log('No error on check file')
			return await this.file.checkFile(this.storageDirectory, fileName)
		} catch (e) {
			console.log('Error on check file', e.message)
			return Promise.resolve(false)
		}
	}

}

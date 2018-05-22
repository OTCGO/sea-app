import {
	inject,
	TestBed,
	async
} from '@angular/core/testing'
import { File } from '@ionic-native/file'
import { FileMock } from '@ionic-native-mocks/file'

import { Platform } from 'ionic-angular'
import { FileStorageProvider } from './file-storage.provider'

describe('Test file-storage.provider', function () {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				FileStorageProvider,
				Platform,
				{ provide: File, useClass: FileMock },
			]
		}).compileComponents()
	}))

	beforeEach((() => {

	}))

	it('Login with wif', inject([FileStorageProvider], (wp: FileStorageProvider) => {
		expect(true).toBeTruthy()
	}))

	it('test have an account',
		inject([FileStorageProvider], async (wp: FileStorageProvider) => {

		})
	)

	it('test old format account',
		inject([FileStorageProvider], (wp: FileStorageProvider) => {})
	)
})

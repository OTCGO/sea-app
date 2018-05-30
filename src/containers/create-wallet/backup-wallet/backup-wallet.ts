import {
	Component,
	OnInit
} from '@angular/core'
import { IonicPage, NavController, Platform, AlertController } from 'ionic-angular'
import { AccountProvider } from '../../../providers'
import { Clipboard } from '@ionic-native/clipboard'
import { NotificationProvider } from '../../../providers'
import { NativeStorage } from '@ionic-native/native-storage'
import { TranslateService } from '@ngx-translate/core'
import { CreateWalletPage } from '../create-wallet'


@IonicPage({
  name: 'BackupWallet',
  segment: 'backup-wallet'
})
@Component({
  selector: 'page-backup-wallet',
  templateUrl: 'backup-wallet.html',
})
export class BackupWalletPage  implements OnInit {
  private encrypted: string
  private isCopy: boolean
  constructor (private navCtrl: NavController,
               private platform: Platform,
               private nativeStorage: NativeStorage,
               private clipBoard: Clipboard,
               private np: NotificationProvider,
               private ts: TranslateService,
               private alertCtrl: AlertController,
               private accountProvider: AccountProvider, ) {}

  ngOnInit () {
    this.isCopy = false

    let createError
    this.ts.get('CW.create_error').subscribe(data => {
      createError = data
    })

    try {
      this.encrypted = this.accountProvider.defaultAccount.encrypted
      console.log('this.encrypted', this.encrypted)
      this.nativeStorage.setItem('account', { encrypted: this.encrypted })

      if (!this.encrypted ) {
        this.np.emit(createError)
        this.navCtrl.setRoot('CreateWallet')
      }
    } catch (error) {
      console.log('error', error)
      this.np.emit(createError)
      this.navCtrl.setRoot('CreateWallet')
    }
    console.log('account', this.encrypted)
  }
  openHome () {
     // this.navCtrl.setRoot('Tabs')
     this.navCtrl.setRoot('Login')
  }

  handleEncryptedClick () {
		try {
			console.log('handleEncryptedClick:account', this.encrypted)
			// if (!account.encrypted) {
			// 	this.np.emit('请使用WIF私钥创建钱包，再导出NEP2私钥')
			// }
			this.showKeyBox({ title: 'NEP2', message: this.encrypted })
		} catch (e) {

		}
	}

  showKeyBox ({ title, message }) {
		const handler = () => {
			if (this.platform.is('mobileweb') || this.platform.is('core')) {
				// const state = copy(message) ? 'success' : 'fail'
				const el = document.createElement('textarea')
				el.value = message
				document.body.appendChild(el)
				el.select()
				document.execCommand('copy')
				document.body.removeChild(el)
        this.isCopy = true

				return this.np.emit(`copy success!`)
      }


			let copyText
			this.ts.get('CW.BACKUP.success').subscribe(data => {
				copyText = data
			})
			this.clipBoard.copy(message).then(() => {
        this.isCopy = true
        this.np.emit(copyText)
      })
		}

    let btnCancle
		let btnCopy

		this.ts.get('PROFILE.CONTACTS.remove_disagree').subscribe(data => {
			btnCancle = data
    })

    this.ts.get('POSSESSIONS.QR_CODE.copy').subscribe(data => {
			btnCopy = data
		})

		this.alertCtrl.create({
			title, message, cssClass: 'mw__exports-actions--key',
			buttons: [{ text: btnCancle }, { text: btnCopy, handler }]
		}).present()
	}
}

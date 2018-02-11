import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { File } from '@ionic-native/file'
import { Platform } from 'ionic-angular'

import { OLD_WALLET_CHECK_LIST, NEW_WALLET_CHECK_LIST, OTCGO_WALLET_FILE_NAME } from "./wallet.consts"

import { wallet } from '../../libs/neon'
import { decryptOldWallet, doSign, doVerify } from '../utils'

@Injectable()
export class WalletProvider {
  dataDirectory: string
  scrypt = { n: 16384, r: 8, p: 8, size: 64 }

  get wallet () {
    if (this._wallet)
      return this._wallet
  }
  set wallet (file) {
    if (this.isWallet(file)) {
      this._wallet = new wallet.Wallet(file)
      this.platform.is('mobile') && this.saveWalletFile()
    }
  }
  private _wallet

  constructor (
    public http: HttpClient,
    private file: File,
    private platform: Platform
  ) {
    if (this.platform.is('mobile')) {
      this.dataDirectory = this.file.dataDirectory

      if (this.isWalletAlreadyExits()) {
        this.readWallet().then((walletStr: string) => {
          this.wallet = JSON.parse(walletStr)
        })
      }
    }
  }

  initWallet () {
    this.wallet = {
      name: 'OTCGO-mobile-wallet',
      scrypt: this.scrypt,
      accounts: [],
      version: 'beta-0.2',
      extra: null
    }
  }

  addAccount (account) { if (this.wallet) this.wallet.addAccount(account) }

  haveAnAccount (): boolean { return !!this.wallet && !!this.wallet.accounts }

  getDefaultAccount () { if (this.haveAnAccount()) return this.wallet.defaultAccount }

  async readWallet () { return await this.file.readAsText(this.dataDirectory, OTCGO_WALLET_FILE_NAME) }

  upgradeAndAddToAccount (oldWalletJSON: object, passphrase: string): Promise<boolean | Error> {
    if (!this.isOldWallet(oldWalletJSON)) return Promise.reject(new Error('Is not an old wallet, Please check again!'))

    const { privateKeyEncrypted, publicKey } = oldWalletJSON as any

    let privateKey

    try {
      privateKey = decryptOldWallet(privateKeyEncrypted, passphrase)
      const result = this._verifyOldWallet(privateKey, publicKey)

      if (result) {
        const account = new wallet.Account(privateKey)
        account.encrypt(passphrase)
        this.wallet.addAccount(account)
        return Promise.resolve(true)
      } else {
        return Promise.reject(new Error('Incorrect Password!'))
      }

    } catch (e) {
      return Promise.reject(new Error(e))
    }
  }

  saveWalletFile () {
    this.file.writeFile(this.dataDirectory, OTCGO_WALLET_FILE_NAME, this.wallet.export())
  }

  isWallet = (items) => NEW_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))

  isOldWallet = (items): boolean => OLD_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))

  isWalletAlreadyExits () { return !window.navigator && this.file.checkFile(this.dataDirectory, OTCGO_WALLET_FILE_NAME) }

  private _verifyOldWallet (prvkey, pubkey) {
    const msg = 'aaa'
    const sigval = doSign(prvkey, msg)
    return doVerify(pubkey, msg, sigval)
  }
}

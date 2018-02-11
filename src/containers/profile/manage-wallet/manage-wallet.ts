import { Component } from '@angular/core'
import { NavController, NavParams, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular'

import { WalletProvider } from '../../../providers/wallet/wallet.provider'
import { PossessionsProvider } from '../../possessions/possessions.provider'
import { Clipboard } from '@ionic-native/clipboard'

import { wallet } from '../../../libs/neon'
import { PriceProvider } from '../../../providers/api/price.provider'

// TODO: Mess code, Try refactor it MEOW

@IonicPage({
	name: 'ManageWallet',
	segment: 'manage-wallet'
})
@Component({
	selector: 'page-manage-wallet',
	templateUrl: 'manage-wallet.html'
})
export class ManageWalletPage {

	accounts = this.possessionsProvider.getAccounts()
	tempLabel: string = ''
	assetsAmount: number
	prices
	GASPrice


	constructor (
		private alertCtrl: AlertController,
		private walletProvider: WalletProvider,
		private possessionsProvider: PossessionsProvider,
		private clipBoard: Clipboard,
		private loadingCtrl: LoadingController,
	    private neoPriceProvider: PriceProvider
	) {}

	showKey ({ title, message }) {
		const prompt = this.alertCtrl.create({
			title,
			message,
			cssClass: 'mw__exports-actions--key',
			buttons: [
				{ text: '取消' },
				{
					text: '复制',
					handler: () => {
						this.clipBoard.copy(message)
					}
				},
			]
		})

		prompt.present()
	}

	showPrivateKeyBox (account) {
		const commonLoading = this.loadingCtrl.create()

		const prompt = this.alertCtrl.create({
			cssClass: 'mw__exports-actions--box',
			title: '导出私钥',
			message: '注意，导出私钥并使用是一件非常危险的事情，建议使用加密私钥（EncryptedKey）代替',
			inputs: [{ name: 'passphrase', placeholder: '密码', type: 'password' }],
			buttons: [
				{ text: '取消' },
				{
					text: '确认',
					handler: ({ passphrase }) => this.parsePassphrase(
						account.encrypted, passphrase, commonLoading, 'privateKey')
				}
			]
		})
		prompt.present()

	}

	showWIFKeyBox (account) {
		const commonLoading = this.loadingCtrl.create()
		const prompt = this.alertCtrl.create({
			cssClass: 'mw__exports-actions--box',
			title: '导出私钥',
			message: '注意，导出私钥并使用是一件非常危险的事情，建议使用加密私钥（EncryptedKey）代替',
			inputs: [{ name: 'passphrase', placeholder: '密码', type: 'password' }],
			buttons: [
				{ text: '取消' },
				{
					text: '确认',
					handler: ({ passphrase }) => this.parsePassphrase(
						account.encrypted, passphrase, commonLoading, 'WIF')
				}
			]
		})

		prompt.present()
	}

	showEncryptedKeyBox (account) {
		this.showKey({ title: 'EncryptedKey', message: account.encrypted })
	}

	saveAccount (account) {
		if (this.tempLabel) {
			account.label = this.tempLabel
			this.tempLabel = ''
			this.walletProvider.saveWalletFile()
		}
	}

	parsePassphrase (encryptedKey, passphrase, commonLoading, type) {
		if (!passphrase) return false
		commonLoading.present().then(
			_ => {
				try {
					wallet.decryptWIF(encryptedKey, passphrase)
					      .then(wif => {
						      commonLoading.dismiss()
						      let account = new wallet.Account(wif)
						      if (type === 'privateKey') {
							      return this.showKey({ title: '私钥', message: account[type] })
						      }
						      return this.showKey({ title: 'WIF', message: account[type] })
					      })
					      .catch(_ => {
						      this.handleError(commonLoading)
					      })
					return true
				} catch (error) {
					this.handleError(commonLoading)
					return true
				}
			}
		)
	}

	openWalletLocation () {

	}

	showDeleteActionBox (toBeDeletedAccount) {
		const alert = this.alertCtrl.create({
			title: '确定执行删除钱包操作？',
			message: '',
			buttons: [
				{ text: '取消' },
				{ text: '确定', handler: () => {
					const loading = this.loadingCtrl.create()

					this.deleteAccount(toBeDeletedAccount).then(_=>
						loading.dismiss().then(_=> this.showDeleteSuccess())
					)
					return true
				}}
			]
		})

		alert.present()
	}

	deleteAccount (toBeDeletedAccount) {
		const wallet = this.walletProvider.wallet
		this.walletProvider.wallet = {
			...wallet,
			accounts: wallet.accounts.filter(account => JSON.stringify(account) !== JSON.stringify(toBeDeletedAccount))
		}
		return Promise.resolve()
	}

	showDeleteSuccess () {
		const alert = this.alertCtrl.create({
			title: '操作完成！',
			message: '您的钱包已删除。',
			buttons: [
				{ text: 'OK' }
			]
		})
		alert.present()
	}

	handleError (commonLoading: Loading) {
		commonLoading.dismiss()

		const prompt = this.alertCtrl.create({
			title: '提示',
			message: '密码错误',
			buttons: ['OK']
		})

		prompt.present()
	}
}

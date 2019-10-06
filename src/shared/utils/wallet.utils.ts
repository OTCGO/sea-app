import {
	Account,
	Wallet
} from '../typings'
import { wallet, u } from '../../libs/neon'
import * as CryptoJS from 'crypto-js'
import * as KJ from 'jsrsasign'

import { NEW_WALLET_CHECK_LIST, OLD_WALLET_CHECK_LIST } from '../constants'

export const isWallet = (items) => NEW_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))

export const isOldWallet = (items): boolean => OLD_WALLET_CHECK_LIST.every(i => items.hasOwnProperty(i))

export const doSign = (prvkey, msg) => {
	const sha256withECDSA = new (<any>KJ).crypto.Signature({ 'alg': 'SHA256withECDSA' })

	sha256withECDSA.initSign({
		'ecprvhex': prvkey,
		'eccurvename': 'secp256r1'
	})
	sha256withECDSA.updateString(msg)

	return sha256withECDSA.sign()
}

export const doVerify = (pubkey, msg, sigval) => {
	const provSignature = new (<any>KJ).crypto.Signature({
		'alg': 'SHA256withECDSA',
		'prov': 'cryptojs/jsrsa'
	})
	provSignature.initVerifyByPublicKey({
		'ecpubhex': pubkey,
		'eccurvename': 'secp256r1'
	})
	provSignature.updateString(msg)
	return provSignature.verify(sigval)
}

export const decryptPrv = (enckey, pwd) => CryptoJS.AES
	.decrypt(enckey, pwd)
	.toString((<any>CryptoJS).enc.Utf8)

export const verifyKeyPair = (prvkey, pubkey) => {
	const msg = 'aaa'
	const sigval = doSign(prvkey, msg)
	return doVerify(pubkey, msg, sigval)
}

export const findDefaultAccount = (appWallet: Wallet): Account => {
	try {
		return appWallet.defaultAccount
			|| appWallet.accounts.find(account => account.isDefault || !!(<any>account)._privateKey || !!(<any>account)._WIF)
			|| appWallet.accounts[0]
	} catch (e) {
		return null
	}
}

export const getEveryAccountAddress = (appWallet: Wallet) => appWallet.accounts.map(account => account.address)

export function getWif(encrypted, passphrase) {
	const n = 16384
	const r = 8
	const p = 8
	return new Promise((resolve, reject) => {
		ThinNeo.Helper.GetPrivateKeyFromNep2(encrypted, passphrase, n, r, p, (info, result) => {
			try {
				if (info === 'finish') {
					const prikey = result as Uint8Array
					const wif = ThinNeo.Helper.GetWifFromPrivateKey(prikey)
					resolve(wif)
				}

				reject('error')
				// console.log('info=' + info)
				// const prikey = result as Uint8Array
				// // console.log('result=' + prikey.toHexString())
				// const pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey)
				// const address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey)
				// console.log('address=' + address)

			} catch (error) {
				reject('error')
				console.log('GetPrivateKeyFromNep2', error)
			}
		})
	})
}

export function GetPrivateKeyFromNep2(encrypted, passphrase) {
	const n = 16384
	const r = 8
	const p = 8
	return new Promise((resolve, reject) => {
		ThinNeo.Helper.GetPrivateKeyFromNep2(encrypted, passphrase, n, r, p, (info, result) => {
			try {
				if (info === 'finish') {
					const prikey = result as Uint8Array
					resolve(prikey.toHexString())
				}

				reject('error')
				// console.log('info=' + info)
				// const prikey = result as Uint8Array
				// // console.log('result=' + prikey.toHexString())
				// const pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prikey)
				// const address = ThinNeo.Helper.GetAddressFromPublicKey(pubkey)
				// console.log('address=' + address)

			} catch (error) {
				reject('error')
				console.log('GetPrivateKeyFromNep2', error)
			}
		})
	})
}


export const {
	isWIF,
	isAddress,
	isNEP2,
	isPrivateKey,
	isPublicKey,
	decryptAsync
} = wallet

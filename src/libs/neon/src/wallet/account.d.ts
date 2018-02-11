import { ContractParam } from '../sc/index'
import { ScryptParams, WalletAccount } from './index'

export interface IAccount {
	key: string
	address: string
	label: string
	extra?: null
	isDefault: boolean
	lock: boolean
	contract: {}
}

export class Account {
	constructor ()
	constructor (str: string)
	constructor (account: IAccount)

	WIF: string
	privateKey: string
	publicKey: string
	scriptHash: string
	address: string

	getPublicKey (encoded: boolean): string

	encrypt (keyphrase: string, scryptParams?: ScryptParams): Account
	decrypt (keyphrase: string, scryptParams?: ScryptParams): Account
	export (): WalletAccount
}
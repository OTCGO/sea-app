export interface WalletScryptParams {
	n: number
	r: number
	p: number
}

export interface ScryptParams {
	cost: number
	blockSize: number
	parallel: number
}

export interface WalletFile {
	name: string
	version: string
	scrypt: WalletScryptParams | ScryptParams
	accounts: WalletAccount[]
	extra: object
}

export interface WalletAccount {
	address: string
	label: string
	isDefault: boolean
	lock: boolean
	key: string
	contract: object | null
	extra: object
}

export interface Account extends WalletAccount {
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

export interface AccountConstructor {
	readonly prototype: Account

	new (strOrWalletAccount: string | WalletAccount): Account
}

export declare const Account: AccountConstructor

export interface Wallet extends WalletFile {
	name: string
	scrypt: WalletScryptParams
	accounts: Account[]
	extra: object
	defaultAccount

	decrypt (index: number, keyphrase: string): boolean
	decryptAll (keyphrase: string): boolean[]
	encrypt (index: number, keyphrase: string): boolean
	encryptAll (keyphrase: string): boolean[]
	export (): string

	addAccount (acct: WalletAccount | Account | object): number
	setDefault (index: number): this
	writeFile (filepath: string): boolean
}


export interface WalletConstructor {
	readonly prototype: Wallet
	new (file: WalletFile): Wallet

	import (jsonString: string): Wallet
	readFile (filepath: string): Wallet
}

declare const Wallet: WalletConstructor
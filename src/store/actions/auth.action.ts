import { Action } from '@ngrx/store'
import { OldWalletFile } from '../../shared/models'
import { Wallet, WalletFile } from '../../shared/typings'


// Data Definition
//  - Login means login with nep5 wallet
//  - LoginOldWallet means login with old wallet
//  - LoginWIF means login with Wif
//  - LoginLedger means login with nano Ledger wallet
//  - LoginNeoDun means login with Neo Dun wallet

export enum AuthActionTypes {
	LOGIN = '[Auth] Login',
	LOGIN_FAIL = '[Auth] Login Fail',
	LOGIN_SUCCESS = '[Auth] Login Success',
	LOGIN_OLD_WALLET = '[Auth] Login Old Wallet',
	LOGIN_OLD_WALLET_FAIL = '[Auth] Login Old Wallet Fail',
	LOGIN_OLD_WALLET_SUCCESS = '[Auth] Login Old Wallet Success',
	LOGIN_WIF = '[Auth] Login WIF',
	LOGIN_WIF_FAIL = '[Auth] Login WIF Fail',
	LOGIN_WIF_SUCCESS = '[Auth] Login WIF Success',
	LOGIN_LEDGER = '[Auth] Login Ledger',
	LOGIN_LEDGER_FAIL = '[Auth] Login  LedgerFail',
	LOGIN_LEDGER_SUCCESS = '[Auth] Login  LedgerSuccess',
	LOGIN_NEO_DUN = '[Auth] Login NEO DUN',
	LOGIN_NEO_DUN_FAIL = '[Auth] Login NEO DUN Fail',
	LOGIN_NEO_DUN_SUCCESS = '[Auth] Login NEO DUN Success',
	CREATE_WALLET = '[Auth] Create Wallet',
	CREATE_WALLET_FAIL = '[Auth] Create Wallet Fail',
	CREATE_WALLET_SUCCESS = '[Auth] Create Wallet Success',
}

export class Login implements Action {
	readonly type = AuthActionTypes.LOGIN

	constructor (public payload: WalletFile) {}
}

export class LoginFail implements Action {
	readonly type = AuthActionTypes.LOGIN_FAIL

	constructor (public payload) { }
}

export class LoginSuccess implements Action {
	readonly type = AuthActionTypes.LOGIN_SUCCESS

	constructor (public payload: Wallet) { }
}

export class LoginOldWallet implements Action {
	readonly type = AuthActionTypes.LOGIN_OLD_WALLET

	constructor (public payload: { oldWallet: OldWalletFile, passphrase: string }) { }
}

export class LoginOldWalletFail implements Action {
	readonly type = AuthActionTypes.LOGIN_OLD_WALLET_FAIL

	constructor (public payload) { }
}

export class LoginOldWalletSuccess implements Action {
	readonly type = AuthActionTypes.LOGIN_OLD_WALLET_SUCCESS
}

export class LoginWif implements Action {
	readonly type = AuthActionTypes.LOGIN_WIF

	constructor (public payload: string) { }
}

export class LoginWifFail implements Action {
	readonly type = AuthActionTypes.LOGIN_WIF_FAIL

	constructor (public payload) { }
}

export class LoginWifSuccess implements Action {
	readonly type = AuthActionTypes.LOGIN_WIF_SUCCESS
}

export class LoginLedger implements Action {
	readonly type = AuthActionTypes.LOGIN_LEDGER
}

export class LoginLedgerFail implements Action {
	readonly type = AuthActionTypes.LOGIN_LEDGER_FAIL

	constructor (public payload) { }
}

export class LoginLedgerSuccess implements Action {
	readonly type = AuthActionTypes.LOGIN_LEDGER_SUCCESS

	constructor (public payload) { }
}

export class LoginNeoDun implements Action {
	readonly type = AuthActionTypes.LOGIN_NEO_DUN
}

export class LoginNeoDunFail implements Action {
	readonly type = AuthActionTypes.LOGIN_NEO_DUN_FAIL

	constructor (public payload) { }
}

export class LoginNeoDunSuccess implements Action {
	readonly type = AuthActionTypes.LOGIN_NEO_DUN_SUCCESS

	constructor (public payload) { }
}

export class CreateWallet implements Action {
	readonly type = AuthActionTypes.CREATE_WALLET

	constructor (public payload) { }
}

export class CreateWalletFail implements Action {
	readonly type = AuthActionTypes.CREATE_WALLET_FAIL

	constructor (public payload) { }
}

export class CreateWalletSuccess implements Action {
	readonly type = AuthActionTypes.CREATE_WALLET_SUCCESS
}


export type AuthActions =
	Login
	| LoginFail
	| LoginSuccess
	| LoginOldWallet
	| LoginOldWalletFail
	| LoginOldWalletSuccess
	| LoginWif
	| LoginWifFail
	| LoginWifSuccess
	| LoginLedger
	| LoginLedgerFail
	| LoginLedgerSuccess
	| LoginNeoDun
	| LoginNeoDunFail
	| LoginNeoDunSuccess
	| CreateWallet
	| CreateWalletFail
	| CreateWalletSuccess

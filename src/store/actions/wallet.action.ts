import { Action } from '@ngrx/store'
import {
	Account,
	Wallet
} from '../../shared/typings'


export enum WalletActionTypes {
	LOAD = '[Wallet] Load',
	LOAD_FAIL = '[Wallet] Load Fail',
	LOAD_SUCCESS = '[Wallet] Load Success',
	ADD_ACCOUNT = '[Wallet] Add Account',
	ADD_ACCOUNT_FAIL = '[Wallet] Add Account Fail',
	ADD_ACCOUNT_SUCCESS = '[Wallet] Add Account Success',
	ADD_ACCOUNTS = '[Wallet] Add Accounts',
	ADD_ACCOUNTS_FAIL = '[Wallet] Add Accounts Fail',
	ADD_ACCOUNTS_SUCCESS = '[Wallet] Add Accounts Success',
	REMOVE_ACCOUNT = '[Wallet] Remove Account',
	REMOVE_ACCOUNT_FAIL = '[Wallet] Remove Account Fail',
	REMOVE_ACCOUNT_SUCCESS = '[Wallet] Remove Account Success',
	CHANGE_ACCOUNT_LABEL = '[Wallet] Change Account Label',
	SET_DEFAULT_ACCOUNT = '[Wallet] Set Default Account',
	SAVE_WALLET = '[Wallet] Save Wallet',
	UPDATE_WALLET = '[Wallet] Update'
}

export class Load implements Action {
	readonly type = WalletActionTypes.LOAD
}

export class LoadFail implements Action {
	readonly type = WalletActionTypes.LOAD_FAIL

	constructor (public payload) { }
}

export class LoadSuccess implements Action {
	readonly type = WalletActionTypes.LOAD_SUCCESS

	constructor (public payload: Wallet) { }
}

export class AddAccounts implements Action {
	readonly type = WalletActionTypes.ADD_ACCOUNTS

	constructor (public payload) { }
}

export class AddAccountsFail implements Action {
	readonly type = WalletActionTypes.ADD_ACCOUNTS_FAIL

	constructor (public payload) { }
}

export class AddAccountsSuccess implements Action {
	readonly type = WalletActionTypes.ADD_ACCOUNTS_SUCCESS
}

export class AddAccount implements Action {
	readonly type = WalletActionTypes.ADD_ACCOUNT

	constructor (public payload: Account) { }
}

export class AddAccountFail implements Action {
	readonly type = WalletActionTypes.ADD_ACCOUNT_FAIL

	constructor (public payload) { }
}

export class AddAccountSuccess implements Action {
	readonly type = WalletActionTypes.ADD_ACCOUNT_SUCCESS

	constructor (public payload: Account) { }
}

export class RemoveAccount implements Action {
	readonly type = WalletActionTypes.REMOVE_ACCOUNT

	constructor (public payload: Account) { }
}

export class RemoveAccountFail implements Action {
	readonly type = WalletActionTypes.REMOVE_ACCOUNT_FAIL

	constructor (public payload) { }
}

export class RemoveAccountSuccess implements Action {
	readonly type = WalletActionTypes.REMOVE_ACCOUNT_SUCCESS
}

export class ChangeAccountLabel implements Action {
	readonly type = WalletActionTypes.CHANGE_ACCOUNT_LABEL

	constructor (public payload: Account) { }
}

export class SetDefaultAccount implements Action {
	readonly type = WalletActionTypes.SET_DEFAULT_ACCOUNT

	constructor (public payload: Account) { }
}

export class Update implements Action {
	readonly type = WalletActionTypes.UPDATE_WALLET

	constructor (public payload: { key: string, value: any }) { }
}

export type WalletActions =
	Load
	| LoadFail
	| LoadSuccess
	| AddAccount
	| AddAccountFail
	| AddAccountSuccess
	| AddAccounts
	| AddAccountsFail
	| AddAccountsSuccess
	| RemoveAccount
	| RemoveAccountFail
	| RemoveAccountSuccess
	| ChangeAccountLabel
  | SetDefaultAccount
  | Update

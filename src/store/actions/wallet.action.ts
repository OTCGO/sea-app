import { Action } from '@ngrx/store'

export enum WalletActionTypes {
	LOAD = '[Wallet] Load',
	LOAD_FAIL = '[Wallet] Load Fail',
	LOAD_SUCCESS = '[Wallet] Load Success'
}

export class Load implements Action {
	readonly type =	WalletActionTypes.LOAD
}

export class LoadFail implements Action {
	readonly type = WalletActionTypes.LOAD_FAIL

	constructor (public payload) { }
}

export class LoadSuccess implements Action {
	readonly type = WalletActionTypes.LOAD_SUCCESS

	constructor (public payload) { }
}

export type WalletActions =
	Load
	| LoadFail
	| LoadSuccess


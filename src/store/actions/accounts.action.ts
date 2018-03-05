import { Action } from '@ngrx/store'

export enum AccountsActionTypes {
	LOAD = '[Accounts] Load',
	LOAD_FAIL = '[Accounts] Load Fail',
	LOAD_SUCCESS = '[Accounts] Load Success'
}

export class Load implements Action {
	readonly type = AccountsActionTypes.LOAD
}

export class LoadFail implements Action {
	readonly type = AccountsActionTypes.LOAD_FAIL

	constructor (public payload) { }
}

export class LoadSuccess implements Action {
	readonly type = AccountsActionTypes.LOAD_SUCCESS

	constructor (public payload) { }
}

export type AccountsActions =
	Load
	| LoadFail
	| LoadSuccess

import { Action } from '@ngrx/store'

export enum AccountActionTypes {
	LOAD = '[Account] Load',
	LOAD_FAIL = '[Account] Load Fail',
	LOAD_SUCCESS = '[Account] Load Success'
}

export class Load implements Action {
	readonly type =	AccountActionTypes.LOAD
}

export class LoadFail implements Action {
	readonly type = AccountActionTypes.LOAD_FAIL

	constructor (public payload) { }
}

export class LoadSuccess implements Action {
	readonly type = AccountActionTypes.LOAD_SUCCESS

	constructor (public payload) { }
}


export type AccountActions =
	Load
	| LoadFail
	| LoadSuccess

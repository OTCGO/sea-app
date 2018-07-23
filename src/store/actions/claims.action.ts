import { Action } from '@ngrx/store'

export enum ClaimsActionTypes {
	LOAD = '[Claims] Load Claims',
	LOAD_ONG = '[Claims] Load Ong Claims',
	LOAD_FAIL = '[Claims] Load Claims Fail',
	LOAD_SUCCESS = '[Claims] Load Claims Success',
	DO_CLAIM = '[Claims] Do Claims',
	DO_CLAIM_FAIL = '[Claims] Do Claims Fail',
	DO_CLAIM_SUCCESS = '[Claims] Do Claims Success',
}

export class Load implements Action {
	readonly type = ClaimsActionTypes.LOAD
}

export class LoadONG implements Action {
	readonly type = ClaimsActionTypes.LOAD_ONG
}

export class LoadFail implements Action {
	readonly type = ClaimsActionTypes.LOAD_FAIL
	constructor (public payload: Error | string) {}
}

export class LoadSuccess implements Action {
	readonly type = ClaimsActionTypes.LOAD_SUCCESS
	constructor (public payload) {}
}

export class DoClaim implements Action {
	readonly type = ClaimsActionTypes.DO_CLAIM
	constructor (public payload: string) {}
}

export class DoClaimFail implements Action {
	readonly type = ClaimsActionTypes.DO_CLAIM_FAIL
	constructor (public payload: Error | string) {}
}

export class DoClaimSuccess implements Action {
	readonly type = ClaimsActionTypes.DO_CLAIM_SUCCESS
	constructor (public payload) {}
}

export type ClaimsActions =
	Load
	| LoadONG
	| LoadFail
	| LoadSuccess
	| DoClaim
	| DoClaimFail
	| DoClaimSuccess

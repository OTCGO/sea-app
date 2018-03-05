import { Action } from '@ngrx/store'

export enum MarketsActionTypes {
	LOAD = '[Markets] Load markets',
	LOAD_SUCCESS = '[Markets] Load markets success',
	LOAD_FAIL = '[Markets] Load markets fail',
}

export class Load implements Action {
	readonly type = MarketsActionTypes.LOAD
}

export class LoadSuccess implements Action {
	readonly type = MarketsActionTypes.LOAD_SUCCESS

	constructor (public payload: any) {}
}

export class LoadFail implements Action {
	readonly type = MarketsActionTypes.LOAD_FAIL

	constructor (public payload: any) {}
}

export type MarketsActions =
	Load
	| LoadFail
	| LoadSuccess

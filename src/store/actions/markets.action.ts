import { Action } from '@ngrx/store'

export enum MarketsActionTypes {
	LOAD = '[Markets] Load markets',
	LOAD_SUCCESS = '[Markets] Load markets success',
	LOAD_FAIL = '[Markets] Load markets fail',
	LOAD_DETAIL = '[Markets] Load markets detail',
	LOAD_DETAIL_SUCCESS = '[Markets] Load markets detail success',
	LOAD_DETAIL_FAIL = '[Markets] Load markets detail fail',
	SELECT = '[Markets] Select',
	UPDATE_MARKETS_LOAD_TIME = '[Markets] Update Markets Load Time',
	UPDATE_DETAILS_LOAD_TIME = '[Markets] Update Details Load Time'
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

export class LoadDetail implements Action {
	readonly type = MarketsActionTypes.LOAD_DETAIL

	constructor (public payload?: string) {}
}

export class LoadDetailSuccess implements Action {
	readonly type = MarketsActionTypes.LOAD_DETAIL_SUCCESS

	constructor (public payload: any) {}
}

export class LoadDetailFail implements Action {
	readonly type = MarketsActionTypes.LOAD_DETAIL_FAIL

	constructor (public payload: any) {}
}

export class Select implements Action {
	readonly type = MarketsActionTypes.SELECT

	constructor (public payload: string) {}
}

export class UpdateMarketsLoadTime implements Action {
	readonly type = MarketsActionTypes.UPDATE_MARKETS_LOAD_TIME
}

export class UpdateDetailsLoadTime implements Action {
	readonly type = MarketsActionTypes.UPDATE_DETAILS_LOAD_TIME
}

export type MarketsActions =
	Load
	| LoadFail
	| LoadSuccess
	| LoadDetail
	| LoadDetailFail
	| LoadDetailSuccess
	| Select
	| UpdateMarketsLoadTime
	| UpdateDetailsLoadTime

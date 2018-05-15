import { Action } from '@ngrx/store'
import { TransactionHistory } from '../../shared/models'

export enum TransactionHistoryActionTypes {
	LOAD = "[Transaction History] Load",
	LOAD_FAIL = "[Transaction History] Load Fail",
	LOAD_SUCCESS = "[Transaction History] Load Success",
	LOAD_DETAIL = "[Transaction History] Load Detail",
	LOAD_DETAIL_FAIL = "[Transaction History] Load Detail Fail",
	LOAD_DETAIL_SUCCESS = "[Transaction History] Load Detail Success",
	SELECT = '[Transaction History] Select History TransactionID',
}

export class Load implements Action {
	readonly type = TransactionHistoryActionTypes.LOAD
}

export class LoadSuccess implements Action {
	readonly type = TransactionHistoryActionTypes.LOAD_SUCCESS
	constructor (public payload: TransactionHistory[]) {}
}

export class LoadFail implements Action {
	readonly type = TransactionHistoryActionTypes.LOAD_FAIL
	constructor (public payload: string | Error) {}
}

export class LoadDetail implements Action {
	readonly type = TransactionHistoryActionTypes.LOAD_DETAIL
}

export class LoadDetailSuccess implements Action {
	readonly type = TransactionHistoryActionTypes.LOAD_DETAIL_SUCCESS
	constructor (public payload) {}
}

export class LoadDetailFail implements Action {
	readonly type = TransactionHistoryActionTypes.LOAD_DETAIL_FAIL
	constructor (public payload: string | Error) {}
}

export class Select implements Action {
	readonly type = TransactionHistoryActionTypes.SELECT
	constructor (public payload: string) {}
}

export type TransactionHistoryActions =
	Load
	| LoadFail
	| LoadSuccess
	| LoadDetail
	| LoadDetailFail
	| LoadDetailSuccess
	| Select

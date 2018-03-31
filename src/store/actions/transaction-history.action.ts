import { Action } from '@ngrx/store'

export enum TransactionHistoryActionTypes {
	LOAD = "[Transaction History] Load",
	LOAD_FAIL = "[Transaction History] Load Fail",
	LOAD_SUCCESS = "[Transaction History] Load Success"
}

export class Load implements Action {
	readonly type = TransactionHistoryActionTypes.LOAD
}

export class LoadSuccess implements Action {
	readonly type = TransactionHistoryActionTypes.LOAD_SUCCESS

	constructor (public payload) {}
}

export class LoadFail implements Action {
	readonly type = TransactionHistoryActionTypes.LOAD_FAIL

	constructor (public payload: string | Error) {}
}


export type TransactionHistoryActions = Load | LoadFail | LoadSuccess

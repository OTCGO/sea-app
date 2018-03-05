import { Action } from '@ngrx/store'

export enum BalancesActionTypes {
	LOAD = '[balances] Load',
	LOAD_FAIL = '[balances] Load Error',
	LOAD_SUCCESS = '[balances] Load Success'
}

export class Get implements Action {
	readonly type = BalancesActionTypes.LOAD

	constructor (public payload: string) {}
}

export class GetSuccess implements Action {
	readonly type = BalancesActionTypes.LOAD_SUCCESS

	constructor (public payload) {}
}

export class GetError implements Action {
	readonly type = BalancesActionTypes.LOAD_FAIL

	constructor (public payload) {}
}

export type BalancesActions = Get | GetSuccess | GetError

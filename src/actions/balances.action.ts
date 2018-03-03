import { Action } from '@ngrx/store'

export enum BalancesActionTypes {
	GET = '[balances] get',
	GET_ERROR = '[balances] get error',
	GET_SUCCESS = '[balances] get success'
}

export class Get implements Action {
	readonly type = BalancesActionTypes.GET

	constructor (public payload: string) {}
}

export class GetSuccess implements Action {
	readonly type = BalancesActionTypes.GET_SUCCESS

	constructor (public payload) {}
}

export class GetError implements Action {
	readonly type = BalancesActionTypes.GET_ERROR

	constructor (public payload) {}
}

export type BalancesActions = Get | GetSuccess | GetError

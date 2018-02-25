import { Action } from '@ngrx/store'

export enum GET_BALANCES_TYPES {
	GET = '[balances] get',
	GET_ERROR = '[balances] get error',
	GET_SUCCESS = '[balances] get success'
}

export class Get implements Action {
	readonly type = GET_BALANCES_TYPES.GET

	constructor (public payload: string) {}
}

export class GetSuccess implements Action {
	readonly type = GET_BALANCES_TYPES.GET_SUCCESS

	constructor (public payload) {}
}

export class GetError implements Action {
	readonly type = GET_BALANCES_TYPES.GET_ERROR

	constructor (public payload) {}
}

export type BALANCES_ACTIONS = Get | GetSuccess | GetError

import { Action } from '@ngrx/store'


export enum PricesActionTypes {
	LOAD_PRICES = '[Markets] Load prices',
	LOAD_PRICES_SUCCESS = '[Markets] Load prices success',
	LOAD_PRICES_FAIL = '[Markets] Load prices fail'
}


export class Load implements Action {
	readonly type = PricesActionTypes.LOAD_PRICES
}

export class LoadSuccess implements Action {
	readonly type = PricesActionTypes.LOAD_PRICES_SUCCESS

	constructor (public payload: any) {}
}

export class LoadFail implements Action {
	readonly type = PricesActionTypes.LOAD_PRICES_FAIL

	constructor (public payload: any) {}
}


export type PricesActions =
	Load
	| LoadFail
	| LoadSuccess
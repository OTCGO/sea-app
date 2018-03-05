import { Action } from '@ngrx/store'


export enum PricesActionTypes {
	LOAD = '[Markets] Load prices'
}

export class Load implements Action {
	readonly type = PricesActionTypes.LOAD

	constructor (public payload: any) {}
}

export type PricesActions = Load
